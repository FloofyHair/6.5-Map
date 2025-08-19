
#!/usr/bin/env python3
"""
MIT Catalog Scraper (clean version)
-----------------------------------
Fetches and parses MIT's course catalog search result for a given course
(e.g., "6.1200") and outputs normalized JSON.

Usage:
  python scrape_mit_catalog.py 6.1200
  python scrape_mit_catalog.py 6.1200 18.06 8.02
  python scrape_mit_catalog.py --merge classes.json 6.1200 18.06

Requires:
  pip install requests beautifulsoup4
"""
import argparse
import json
import re
import sys
from typing import Dict, List, Optional

try:
    import requests
    from bs4 import BeautifulSoup
except Exception:
    sys.stderr.write(
        "This script requires 'requests' and 'beautifulsoup4'. Install with:\n"
        "  pip install requests beautifulsoup4\n"
    )
    raise

BASE = "https://student.mit.edu/catalog/search.cgi?search={}"

ICON_ALT_TO_TAG = {
    # Levels
    "Undergrad": "undergrad",
    "Graduate": "grad",
    # Terms
    "Fall": "fall",
    "Spring": "spring",
    "IAP": "iap",
    "Summer": "summer",
    # Attributes
    "Rest Elec in Sci & Tech": "rest",
    "CI-H": "ci-h",
    "CI-HW": "ci-hw",
    "CI-M": "ci-m",
    "HASS-H": "hass-h",
    "HASS-A": "hass-a",
    "HASS-S": "hass-s",
    "Lab": "lab",
    "Institute Lab": "lab",
    "Partial Lab": "partial-lab",
    "Not offered regularly": "not-regularly",
}

SKIP_ICON_ALTS = {"______", "Add to schedule"}

def course_id_from_code(code: str) -> str:
    """A6_1200 from 6.1200 (keep letters too, e.g., 18.01A -> A18_01A)."""
    code = code.strip()
    return "A" + code.replace(".", "_")

def clean_text(s: str) -> str:
    return re.sub(r"\s+", " ", s).strip()

def parse_units(text: str) -> Optional[str]:
    m = re.search(r"Units:\s*([0-9\-]+)", text, re.I)
    return m.group(1) if m else None

def fetch_html(course: str) -> str:
    url = BASE.format(course)
    r = requests.get(url, timeout=20)
    r.raise_for_status()
    return r.text

def parse_course_html(html: str) -> Dict:
    soup = BeautifulSoup(html, "html.parser")
    root = soup.find("blockquote") or soup

    # Title line: <h3>6.1200[J] Mathematics for Computer Science
    h3 = root.find("h3")
    if not h3:
        raise ValueError("Could not find <h3> title block for course")

    full_title = clean_text(h3.get_text(" ", strip=True))
    m = re.match(r"^([0-9A-Za-z\.\-]+(?:\[[Jj]\])?)\s+(.*)$", full_title)
    if m:
        raw_code, course_title = m.groups()
    else:
        parts = full_title.split(maxsplit=1)
        raw_code = parts[0]
        course_title = parts[1] if len(parts) > 1 else parts[0]

    # Normalize code by removing [J] flag for 'code' field, but keep 'joint' tag
    joint = "[J]" in raw_code or "[j]" in raw_code
    code = raw_code.replace("[J]", "").replace("[j]", "")

    # Tags from <img alt="...">: use the raw alt text (UI will lowercase/sanitize for icon/color)
    tags: List[str] = []
    for img in root.find_all("img"):
        alt = (img.get("alt") or "").strip()
        if not alt or alt in SKIP_ICON_ALTS:
            continue
        if alt not in tags:
            tags.append(alt)
    if joint and "Joint" not in tags:
        tags.insert(0, "Joint")

    # Prereq text
    prereq_text = None
    # Try to find "Prereq:" line by scanning text near <br> nodes
    for br in root.find_all("br"):
        nxt = br.next_sibling
        if isinstance(nxt, str) and nxt.strip().lower().startswith("prereq:"):
            # Gather until the next <br>
            parts = []
            node = br.next_sibling
            # Skip the leading "Prereq:"
            if isinstance(node, str):
                node = node.next_sibling
            while node and getattr(node, "name", None) != "br":
                if getattr(node, "get_text", None):
                    parts.append(node.get_text(" ", strip=True))
                elif isinstance(node, str):
                    parts.append(node.strip())
                node = node.next_sibling
            prereq_text = clean_text(" ".join(p for p in parts if p))
            break
    if not prereq_text:
        txt = root.get_text("\n", strip=True)
        mt = re.search(r"Prereq:\s*(.+)", txt, re.I)
        if mt:
            prereq_text = clean_text(mt.group(1))

    # Units (from whole text)
    text_all = root.get_text("\n", strip=True)
    units = parse_units(text_all)

    
    # Description: begins right after <img alt="______" src="/icns/hr.gif"> <br>
    # and ends at the next <br>. It is quoted and on a single line.
    description = None
    # find img with "______" as alt
    hr_img = h3.find_next("img", alt="______")
    hr_img2 = hr_img.find_next("img", alt="______")
    if hr_img2:
        hr_img = hr_img2
    
    if hr_img:
        # Move to the first <br> after hr.gif, then collect text until the next <br>
        first_br = hr_img.find_next("br")
        if first_br:
            # Instead of parsing for quoted or cleaned description, just take the next line after the <br> as the description.
            node = first_br.next_sibling
            while node and (isinstance(node, str) and not node.strip()):
                node = node.next_sibling  # skip empty text nodes
            if node:
                if getattr(node, "get_text", None):
                    description = clean_text(node.get_text(" ", strip=True))
                elif isinstance(node, str):
                    description = clean_text(node.strip())

    if not description:
        # Fallback: choose the longest paragraph not mentioning 'subject found'
        paragraphs = [clean_text(p.get_text(" ", strip=True)) for p in root.find_all("p")]
        paragraphs = [p for p in paragraphs if not re.search(r"subject found", p, re.I)]
        if paragraphs:
            desc = max(paragraphs, key=len)
            m = re.search(
                r"(Elementary\b.*|Introduces\b.*|Introduction\b.*|Provides\b.*|Covers\b.*|Studies\b.*|Examines\b.*|Overview\b.*|An introduction\b.*)",
                desc,
                re.I,
            )
            description = (m.group(1).strip() if m else desc)


        # Instructors: italic names inside <i> ... </i>
    instructors = []
    for iel in root.find_all("i"):
        txt = clean_text(iel.get_text(" ", strip=True))
        if not txt:
            continue
        low = txt.lower()

        # Skip known junk
        if low in ("+final", "no textbook information available", "tba"):
            continue
        if "subject found" in low:
            continue

        # Skip time-like strings (TR2.30-4 etc.)
        if re.match(r"^[MTWRFSU]{1,7}\s*\d", txt, re.I) or re.search(r"\d\.\d{2}\s*-\s*\d", txt):
            continue

        # Skip schedule placeholders like Lab/Recitation TBA
        parent_text = iel.find_previous(string=True)
        if parent_text and re.search(r"(Lab|Recitation|Lecture):", parent_text, re.I):
            continue

        instructors.append(txt)

    # dedupe preserving order
    seen = set()
    instructors = [x for x in instructors if not (x in seen or seen.add(x))]

    result = {
        "code": code,
        "title": course_title,
        "label": course_title,
        "description": description,
        "units": units,
        "prereq_text": prereq_text,
        "instructors": instructors,
        "tags": tags,
        "source": "student.mit.edu",
    }
    return result

def scrape_course(course: str) -> Dict:
    html = fetch_html(course)
    return parse_course_html(html)

def merge_into_nodes(nodes: Dict[str, Dict], course_obj: Dict) -> Dict[str, Dict]:
    """Merge/insert a course object into nodes mapping using our ID scheme."""
    code = course_obj.get("code") or ""
    if not code:
        return nodes
    cid = course_id_from_code(code)
    existing = nodes.get(cid, {})
    merged = {
        **existing,
        "code": code,
        "title": course_obj.get("title") or existing.get("title"),
        "label": course_obj.get("label") or existing.get("label") or course_obj.get("title") or code,
        "description": course_obj.get("description") or existing.get("description"),
        "units": course_obj.get("units") or existing.get("units"),
        "prereq_text": course_obj.get("prereq_text") or existing.get("prereq_text"),
        "instructors": course_obj.get("instructors") or existing.get("instructors"),
        "tags": course_obj.get("tags") or existing.get("tags"),
    }
    nodes[cid] = merged
    return nodes

def main():
    ap = argparse.ArgumentParser(description="Scrape MIT catalog for course info.")
    ap.add_argument("courses", nargs="+", help="Course numbers like 6.1200 18.06 8.02")
    ap.add_argument("--merge", metavar="CLASSES_JSON", help="Path to classes.json to merge into (updates nodes only)")
    ap.add_argument("--out", metavar="OUT_JSON", help="Write scraped output JSON to a file (default: stdout)")
    args = ap.parse_args()

    scraped = {}
    for c in args.courses:
        try:
            obj = scrape_course(c)
            scraped[obj["code"]] = obj
        except Exception as e:
            sys.stderr.write(f"[warn] {c}: {e}\n")

    if args.merge:
        try:
            with open(args.merge, "r", encoding="utf-8") as f:
                data = json.load(f)
        except FileNotFoundError:
            data = {"nodes": {}}
        except Exception as e:
            sys.stderr.write(f"Failed to read {args.merge}: {e}\n")
            return 2
        nodes = data.get("nodes", {})
        for obj in scraped.values():
            nodes = merge_into_nodes(nodes, obj)
        data["nodes"] = nodes
        with open(args.merge, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        out_obj = {cid: nodes[cid] for cid in [course_id_from_code(k) for k in scraped.keys()] if cid in nodes}
    else:
        out_obj = scraped

    out_text = json.dumps(out_obj, indent=2, ensure_ascii=False)
    if args.out:
        with open(args.out, "w", encoding="utf-8") as f:
            f.write(out_text)
    else:
        print(out_text)

if __name__ == "__main__":
    sys.exit(main() or 0)
