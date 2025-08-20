(function () {
    // Tag icons via CSS mask + color variable
    function cssVarForTag(tag) {
        const slug = String(tag)
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");
        return `var(--tag-${slug}, var(--muted))`;
    }
    function urlForTagSvg(tag) {
        const slug = String(tag)
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");
        // console.log(slug);
        return `url('icons/${slug}.svg')`;
    }

    function renderTagIcons(tags) {
        const row = document.createElement("div");
        row.className = "tags";
        (tags || []).forEach((tag) => {
            const el = document.createElement("span");
            el.className = "tag-icon";
            el.style.setProperty("--tag-color", cssVarForTag(tag));

            // Try to load the specific icon, fallback to default if it fails
            const iconUrl = urlForTagSvg(tag);
            el.style.setProperty("--tag-icon-url", iconUrl);

            // Add error handling for missing icons
            const img = new Image();
            img.onerror = () => {
                el.style.setProperty(
                    "--tag-icon-url",
                    "url('icons/default.svg')"
                );
            };
            img.src = iconUrl.replace("url('", "").replace("')", "");

            el.title = String(tag);
            row.appendChild(el);
        });
        return row;
    }

    // --- Data ------------------------------------------------------------
    const nodes = {};

    const mrTiers = [
        {
            title: "Tier 1",
            courses: ["A8_01", "A18_01A", "A6_100A"],
        },
        {
            title: "Tier 2",
            courses: ["A6_1200", "A8_02", "A18_02", "A6_1904"],
        },
        {
            title: "Tier 3",
            courses: [
                "A6_1210",
                "A6_1910",
                "A6_2000",
                "A6_3800",
                "A18_06",
                "A6_3000",
            ],
        },
        { title: "Tier 4", courses: ["A6_3100", "A6_9000"] },
    ];

    const planTiers = [
        { title: "ASE", courses: ["A6_100A"] },
        { title: "Semester 1", courses: ["A8_01", "A18_01A", "A24_00"] },
        { title: "Semester 2", courses: ["A8_02", "A18_02", "A6_1904"] },
        { title: "Semester 3", courses: ["A6_2000"] },
        { title: "Semester 4", courses: [] },
        { title: "Semester 5", courses: [] },
        { title: "Semester 6", courses: [] },
        { title: "Semester 7", courses: [] },
        { title: "Semester 8", courses: [] },
    ];

    const girScience = [
        {
            title: "Biology",
            courses: [],
            link: "https://firstyear.mit.edu/academics-exploration/general-institute-requirements-girs/science-core/",
        },
        {
            title: "Chemistry",
            courses: ["A5_111"],
            link: "https://firstyear.mit.edu/academics-exploration/general-institute-requirements-girs/science-core/",
        },
        {
            title: "Physics",
            courses: ["A8_01", "A8_02"],
            link: "https://firstyear.mit.edu/academics-exploration/general-institute-requirements-girs/science-core/",
        },
        {
            title: "Math",
            courses: ["A18_01A", "A18_02"],
            link: "https://firstyear.mit.edu/academics-exploration/general-institute-requirements-girs/science-core/",
        },
    ];
    const girHass = [
        { title: "Humanities", courses: ["A24_00"] },
        { title: "Arts", courses: [] },
        { title: "Social Sciencies", courses: [] },
        { title: "Concentration", courses: [] },
        { title: "Electives", courses: [] },
    ];
    const girCommunication = [
        {
            title: "CI-H",
            courses: ["A24_00"],
            link: "https://registrar.mit.edu/registration-academics/academic-requirements/communication-requirement/ci-hhw-subjects/listing",
        },
        {
            title: "CI-M",
            courses: ["A6_2220"],
            link: "https://registrar.mit.edu/registration-academics/academic-requirements/communication-requirement/ci-m-subjects/subject",
        },
    ];
    const girLab = [
        {
            title: "Lab",
            courses: ["A6_3800", "A6_3100", "A6_9000"],
            link: "https://catalog.mit.edu/mit/undergraduate-education/general-institute-requirements/#laboratoryrequirementtext",
        },
    ];
    const girPE = [{ title: "PE", courses: ["Crew"] }];
    const girRest = [
        {
            title: "REST",
            courses: ["A6_1200", "A6_1910", "A6_2000", "A6_3000", "A18_06"],
            link: "https://catalog.mit.edu/mit/undergraduate-education/general-institute-requirements/#restrequirementtext",
        },
    ];

    const edges = [
        ["A8_01", "A6_1200"],
        ["A6_100A", "A6_1210"],
        ["A6_1200", "A6_1210"],
        ["A6_100A", "A6_1904"],
        ["A8_02", "A6_1910"],
        ["A6_100A", "A6_1910"],
        ["A6_1904", "A6_1910"],
        ["A8_02", "A6_2000"],
        ["A8_01", "A6_3100"],
        ["A18_06", "A6_3100"],
        ["A8_01", "A8_02"],
        ["A18_01A", "A18_02"],
        ["A18_02", "A6_3800"],
        ["A18_02", "A18_06"],
        ["A6_1910", "A6_9000"],
        ["A6_2000", "A6_9000"],
        ["A6_3000", "A6_9000"],
        ["A6_100A", "A6_3000"],
    ];

    const planEdges = [
        ["A8_01", "A6_1200"],
        ["A6_100A", "A6_1210"],
        ["A6_1200", "A6_1210"],
        ["A6_100A", "A6_1904"],
        ["A8_02", "A6_1910"],
        ["A6_100A", "A6_1910"],
        ["A6_1904", "A6_1910"],
        ["A8_02", "A6_2000"],
        ["A8_01", "A6_3100"],
        ["A18_06", "A6_3100"],
        ["A8_01", "A8_02"],
        ["A18_01A", "A18_02"],
        ["A18_02", "A6_3800"],
        ["A18_02", "A18_06"],
        ["A6_1910", "A6_9000"],
        ["A6_2000", "A6_9000"],
        ["A6_3000", "A6_9000"],
        ["A6_100A", "A6_3000"],
    ];

    // --- Elements -------------------------------------------------------
    async function mergeTagsFromJson() {
        try {
            const resp = await fetch("classes.json");
            if (!resp.ok) return;
            const data = await resp.json();
            const map = data.nodes || data;
            Object.keys(map || {}).forEach((id) => {
                if (!nodes[id]) return;
                if (
                    map[id].tags &&
                    (!nodes[id].tags || nodes[id].tags.length === 0)
                ) {
                    nodes[id].tags = map[id].tags;
                }
            });
        } catch (e) {
            console.warn("Could not merge tags from classes.json", e);
        }
    }

    const grid = document.getElementById("grid");
    const svg = document.getElementById("edges");
    const planGrid = document.getElementById("plan-grid");
    const planSvg = document.getElementById("plan-edges");
    const searchInput = document.getElementById("search");
    const resetBtn = document.getElementById("reset");
    const stage = document.getElementById("stage");
    const testBadge = document.getElementById("testBadge");
    const info = document.getElementById("info");
    const infoClose = document.getElementById("infoClose");
    const infoTitle = document.getElementById("infoTitle");
    const infoCode = document.getElementById("infoCode");
    const infoDesc = document.getElementById("infoDesc");
    const infoWhy = document.getElementById("infoWhy");
    const infoArea = document.getElementById("infoArea");
    const infoSwatch = document.getElementById("infoSwatch");
    const infoTags = document.getElementById("infoTags");

    // --- State ----------------------------------------------------------
    const positions = {}; // id -> {cx,cy}
    const planPositions = {}; // id -> {cx,cy}
    let isolatedSet = null; // Set<string>|null
    let currentSearch = "";
    const nodeMatches = {}; // id -> boolean

    // Build parent map (to -> [from...])
    const parents = new Map();
    edges.forEach(([from, to]) => {
        if (!parents.has(to)) parents.set(to, []);
        parents.get(to).push(from);
    });

    function areaClass(area) {
        return area === "math"
            ? "math"
            : area === "phys"
            ? "phys"
            : area === "chem"
            ? "chem"
            : area === "other"
            ? "other"
            : "ee";
    }
    function cssVar(name) {
        return getComputedStyle(document.documentElement)
            .getPropertyValue(name)
            .trim();
    }
    function strokeFor(area) {
        return area === "math"
            ? cssVar("--math")
            : area === "phys"
            ? cssVar("--phys")
            : area === "chem"
            ? cssVar("--chem")
            : area === "other"
            ? cssVar("--other")
            : cssVar("--ee");
    }

    function makeNodeEl(id) {
        if (!id) return document.createElement("div");

        const d = nodes[id];
        const el = document.createElement("div");

        if (d) {
            // MR node - has full data
            el.className = `node ${areaClass(d.area)}`;
            el.id = id;
            el.tabIndex = 0;
            el.setAttribute("role", "button");
            el.setAttribute("aria-label", `${d.code}: ${d.title || d.label}`);

            // Build header row: code + tags side-by-side
            const head = document.createElement("div");
            head.className = "head";
            const codeEl = document.createElement("span");
            codeEl.className = "code";
            codeEl.textContent = d.code;
            head.appendChild(codeEl);
            head.appendChild(renderTagIcons(d.tags || []));
            el.appendChild(head);

            // Label underneath
            const labelEl = document.createElement("div");
            labelEl.className = "label";
            labelEl.textContent = d.label;
            el.appendChild(labelEl);

            el.addEventListener("click", (e) => {
                e.stopPropagation();
                toggleIsolation(id);
                showInfo(id);
            });
            el.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleIsolation(id);
                    showInfo(id);
                }
            });
        } else {
            // GIR node - create placeholder
            el.className = "node gir-node";
            el.id = id;
            el.tabIndex = 0;
            el.setAttribute("role", "button");
            el.setAttribute("aria-label", id);
            el.innerHTML = `<span class="code">${id}</span><div class="label">GIR Course</div>`;

            el.addEventListener("click", (e) => {
                e.stopPropagation();
                // GIR nodes can be clicked but don't trigger isolation/arrows
                console.log("GIR node clicked:", id);
            });
            el.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    console.log("GIR node activated:", id);
                }
            });
        }

        return el;
    }

    function updateRenderedTags() {
        document.querySelectorAll(".node").forEach((el) => {
            const id = el.id;
            if (!id || !nodes[id]) return;
            const old = el.querySelector(".tags");
            if (old) old.remove();
            const container = el.querySelector(".head") || el;
            container.appendChild(renderTagIcons(nodes[id].tags || []));
        });
    }
    function layout(gridEl, tierData) {
        gridEl.innerHTML = "";
        gridEl.style.gridTemplateColumns = `repeat(${tierData.length}, 1fr)`;
        tierData.forEach((col) => {
            const tier = document.createElement("div");
            tier.className = "tier";
            tier.dataset.title = col.title;

            // Add tier title with optional link
            const titleEl = document.createElement("div");
            titleEl.className = "tier-title";
            if (col.link) {
                const link = document.createElement("a");
                link.href = col.link;
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                link.textContent = col.title;
                titleEl.appendChild(link);
            } else {
                titleEl.textContent = col.title;
            }
            tier.appendChild(titleEl);

            // Always render the tier, even if empty
            if (col.courses && col.courses.length > 0) {
                col.courses.forEach((id) => tier.appendChild(makeNodeEl(id)));
            }
            gridEl.appendChild(tier);
        });
    }

    function positionAll() {
        const gridRect = grid.getBoundingClientRect();
        svg.setAttribute("viewBox", `0 0 ${gridRect.width} ${gridRect.height}`);
        svg.setAttribute("width", gridRect.width);
        svg.setAttribute("height", gridRect.height);
        const base = grid.getBoundingClientRect();
        grid.querySelectorAll(".node").forEach((el) => {
            const b = el.getBoundingClientRect();
            positions[el.id] = {
                cx: b.left - base.left + b.width / 2,
                cy: b.top - base.top + b.height / 2,
            };
        });
        drawEdges();
    }

    function positionPlan() {
        if (!planGrid || !planSvg) return;
        const gridRect = planGrid.getBoundingClientRect();
        planSvg.setAttribute(
            "viewBox",
            `0 0 ${gridRect.width} ${gridRect.height}`
        );
        planSvg.setAttribute("width", gridRect.width);
        planSvg.setAttribute("height", gridRect.height);
        const base = planGrid.getBoundingClientRect();
        planGrid.querySelectorAll(".node").forEach((el) => {
            const b = el.getBoundingClientRect();
            planPositions[el.id] = {
                cx: b.left - base.left + b.width / 2,
                cy: b.top - base.top + b.height / 2,
            };
        });
        drawPlanEdges();
    }

    function shouldDimEdge(from, to) {
        if (currentSearch) {
            // Hide all edges when searching unless both nodes match
            return !(nodeMatches[from] && nodeMatches[to]);
        }
        const inIso =
            !isolatedSet || (isolatedSet.has(from) && isolatedSet.has(to));
        const searchOk = !currentSearch || nodeMatches[from] || nodeMatches[to];
        return !(inIso && searchOk);
    }

    function drawEdges() {
        // Only create defs once
        let defs = svg.querySelector("defs");
        if (!defs) {
            defs = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "defs"
            );
            svg.appendChild(defs);
        }

        if (!svg._edgePaths) svg._edgePaths = {};
        const edgePaths = svg._edgePaths;

        // Only draw arrows for edges whose endpoints are present in the MR grid
        const present = new Set(
            Array.from(grid.querySelectorAll(".node")).map((n) => n.id)
        );

        edges.forEach(([from, to]) => {
            const key = `${from}->${to}`;
            let path = edgePaths[key];
            if (!path) {
                path = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                );
                path.setAttribute("fill", "none");
                path.setAttribute("stroke-width", "2");
                path.setAttribute("data-edge", key);
                svg.appendChild(path);
                edgePaths[key] = path;
            }

            const a = positions[from],
                b = positions[to];
            const bothPresent = present.has(from) && present.has(to) && a && b;
            if (!bothPresent) {
                path.classList.add("instant-hide");
                return;
            } else {
                path.classList.remove("instant-hide");
            }

            const dx = b.cx - a.cx,
                dy = b.cy - a.cy,
                cx = a.cx + dx * 0.5,
                cy = a.cy + dy * 0.5 - 18;
            path.setAttribute(
                "d",
                `M ${a.cx} ${a.cy} Q ${cx} ${cy} ${b.cx} ${b.cy}`
            );

            // Use dynamic colors from node data
            const fromNode = nodes[from];
            if (fromNode) {
                // Use the node's color if available, otherwise fall back to area-based color
                const strokeColor = fromNode.color || strokeFor(fromNode.area);
                path.setAttribute("stroke", strokeColor);

                // Create dynamic arrow marker for this specific color
                const markerId = `arrow-${from}-${to}`;
                let marker = defs.querySelector(`#${markerId}`);
                if (!marker) {
                    marker = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "marker"
                    );
                    marker.setAttribute("id", markerId);
                    marker.setAttribute("viewBox", "0 0 10 10");
                    marker.setAttribute("refX", "9");
                    marker.setAttribute("refY", "5");
                    marker.setAttribute("markerWidth", "6");
                    marker.setAttribute("markerHeight", "6");
                    marker.setAttribute("orient", "auto-start-reverse");

                    const poly = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "polygon"
                    );
                    poly.setAttribute("points", "0,0 10,5 0,10");
                    poly.setAttribute("fill", strokeColor);
                    marker.appendChild(poly);
                    defs.appendChild(marker);
                }

                path.setAttribute("marker-end", `url(#${markerId})`);
            }

            if (shouldDimEdge(from, to)) path.classList.add("dimmed");
            else path.classList.remove("dimmed");
        });

        // Remove stale paths
        Object.keys(edgePaths).forEach((key) => {
            if (!edges.some(([from, to]) => `${from}->${to}` === key)) {
                svg.removeChild(edgePaths[key]);
                delete edgePaths[key];
            }
        });
    }

    function drawPlanEdges() {
        if (!planSvg || !planGrid) return;
        let defs = planSvg.querySelector("defs");
        if (!defs) {
            defs = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "defs"
            );
            planSvg.appendChild(defs);
        }

        if (!planSvg._edgePaths) planSvg._edgePaths = {};
        const edgePaths = planSvg._edgePaths;

        const present = new Set(
            Array.from(planGrid.querySelectorAll(".node")).map((n) => n.id)
        );

        planEdges.forEach(([from, to]) => {
            const key = `${from}->${to}`;
            let path = edgePaths[key];
            if (!path) {
                path = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                );
                path.setAttribute("fill", "none");
                path.setAttribute("stroke-width", "2");
                path.setAttribute("data-edge", key);
                planSvg.appendChild(path);
                edgePaths[key] = path;
            }

            const a = planPositions[from],
                b = planPositions[to];
            const bothPresent = present.has(from) && present.has(to) && a && b;
            if (!bothPresent) {
                path.classList.add("instant-hide");
                return;
            } else {
                path.classList.remove("instant-hide");
            }

            const dx = b.cx - a.cx,
                dy = b.cy - a.cy,
                cx = a.cx + dx * 0.5,
                cy = a.cy + dy * 0.5 - 18;
            path.setAttribute(
                "d",
                `M ${a.cx} ${a.cy} Q ${cx} ${cy} ${b.cx} ${b.cy}`
            );

            const fromNode = nodes[from];
            if (fromNode) {
                const strokeColor = fromNode.color || strokeFor(fromNode.area);
                path.setAttribute("stroke", strokeColor);

                const markerId = `plan-arrow-${from}-${to}`;
                let marker = defs.querySelector(`#${markerId}`);
                if (!marker) {
                    marker = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "marker"
                    );
                    marker.setAttribute("id", markerId);
                    marker.setAttribute("viewBox", "0 0 10 10");
                    marker.setAttribute("refX", "9");
                    marker.setAttribute("refY", "5");
                    marker.setAttribute("markerWidth", "6");
                    marker.setAttribute("markerHeight", "6");
                    marker.setAttribute("orient", "auto-start-reverse");

                    const poly = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "polygon"
                    );
                    poly.setAttribute("points", "0,0 10,5 0,10");
                    poly.setAttribute("fill", strokeColor);
                    marker.appendChild(poly);
                    defs.appendChild(marker);
                }

                path.setAttribute("marker-end", `url(#${markerId})`);
            }

            if (shouldDimEdge(from, to)) path.classList.add("dimmed");
            else path.classList.remove("dimmed");
        });

        Object.keys(edgePaths).forEach((key) => {
            if (!planEdges.some(([from, to]) => `${from}->${to}` === key)) {
                planSvg.removeChild(edgePaths[key]);
                delete edgePaths[key];
            }
        });
    }

    function getAncestors(start) {
        const seen = new Set([start]);
        const stack = [start];
        while (stack.length) {
            const cur = stack.pop();
            const ps = parents.get(cur) || [];
            for (const p of ps) {
                if (!seen.has(p)) {
                    seen.add(p);
                    stack.push(p);
                }
            }
        }
        return seen;
    }

    function applyVisibility() {
        currentSearch = (searchInput?.value || "").trim().toLowerCase();
        Object.keys(nodes).forEach((id) => {
            const d = nodes[id];
            nodeMatches[id] =
                !currentSearch ||
                `${d.code} ${d.label}`.toLowerCase().includes(currentSearch);
        });
        document.querySelectorAll(".node").forEach((el) => {
            const id = el.id;
            const dimByIso = !!isolatedSet && !isolatedSet.has(id);
            const dimBySearch = !!currentSearch && !nodeMatches[id];
            el.classList.toggle("dimmed", dimByIso || dimBySearch);
        });
        drawEdges();
        drawPlanEdges();
    }

    function toggleIsolation(id) {
        const next = getAncestors(id);
        const same =
            isolatedSet &&
            next.size === isolatedSet.size &&
            [...next].every((x) => isolatedSet.has(x));
        isolatedSet = same ? null : next;
        applyVisibility();
    }

    function clearAll() {
        isolatedSet = null;
        if (searchInput) searchInput.value = "";
        applyVisibility();
        hideInfo();
    }

    // --- Info panel logic ----------------------------------------------
    function showInfo(id) {
        const d = nodes[id];
        if (!d) return;

        // Create a link for the title that goes to the MIT course catalog
        const courseCode = d.code;
        const catalogUrl = `http://student.mit.edu/catalog/search.cgi?search=${encodeURIComponent(
            courseCode
        )}`;

        infoTitle.innerHTML = `<a href="${catalogUrl}" target="_blank" rel="noopener noreferrer">${
            d.title || d.label || d.code
        }</a><span class="area">${d.area.toUpperCase()}</span>`;
        infoCode.textContent = d.code;
        infoDesc.textContent = d.description || "—";
        if (infoTags) infoTags.replaceChildren(renderTagIcons(d.tags || []));
        if (infoTags) infoTags.replaceChildren(renderTagIcons(d.tags || []));
        if (infoTags) infoTags.replaceChildren(renderTagIcons(d.tags || []));
        if (infoTags) infoTags.replaceChildren(renderTagIcons(d.tags || []));
        infoWhy.textContent = d.why || "—";
        const color = d.color || strokeFor(d.area);
        infoSwatch.style.background = color;
        info.classList.add("visible");
    }
    function hideInfo() {
        info.classList.remove("visible");
    }

    // --- Init -----------------------------------------------------------
    /* merge from classes.json */
    fetch("classes.json", { cache: "no-store" })
        .then((r) =>
            r.ok
                ? r.json()
                : Promise.reject(new Error("classes.json not found"))
        )
        .then((data) => {
            const ext = (data && data.nodes) || {};
            for (const id in ext) {
                if (!nodes[id]) nodes[id] = {};
                // Merge external node fields onto existing ones
                Object.assign(nodes[id], ext[id]);
            }
            // Now that nodes are loaded, render the layouts
            layout(grid, mrTiers);
            layout(planGrid, planTiers);
            layout(document.getElementById("gir-science"), girScience);
            layout(document.getElementById("gir-hass"), girHass);
            layout(
                document.getElementById("gir-communication"),
                girCommunication
            );
            layout(document.getElementById("gir-lab"), girLab);
            layout(document.getElementById("gir-pe"), girPE);
            layout(document.getElementById("gir-rest"), girRest);

            // Update rendered tag rows now that tags are available
            updateRenderedTags();

            // Position everything after layout
            requestAnimationFrame(() => {
                positionAll();
                positionPlan();
            });

            // Ensure HASS vs Science Core blocks have proportional widths so tier columns match
            const girSection = document.querySelector(".section.gir");
            const girRows = girSection
                ? girSection.querySelectorAll(".section-row")
                : null;
            if (girRows && girRows[0]) {
                const blocks = girRows[0].querySelectorAll(
                    ".gir-block, .section-block"
                );
                if (blocks.length >= 2) {
                    const scienceCount = girScience.length; // 4
                    const hassCount = girHass.length; // 5
                    const total = scienceCount + hassCount;
                    const sciencePct = (scienceCount / total) * 100;
                    const hassPct = (hassCount / total) * 100;
                    // First block is Science Core in markup
                    blocks[0].style.flex = `0 0 ${sciencePct}%`;
                    blocks[1].style.flex = `0 0 ${hassPct}%`;
                }
            }
        })
        .catch((err) => {
            console.warn("Could not merge classes.json:", err);
            // Fallback: render layouts even if JSON fails
            layout(grid, mrTiers);
            layout(planGrid, planTiers);
            layout(document.getElementById("gir-science"), girScience);
            layout(document.getElementById("gir-hass"), girHass);
            layout(
                document.getElementById("gir-communication"),
                girCommunication
            );
            layout(document.getElementById("gir-lab"), girLab);
            layout(document.getElementById("gir-pe"), girPE);
            layout(document.getElementById("gir-rest"), girRest);
            requestAnimationFrame(() => {
                positionAll();
                positionPlan();
            });
        });
    new ResizeObserver(() => positionAll()).observe(grid);
    if (planGrid) new ResizeObserver(() => positionPlan()).observe(planGrid);

    // Also observe GIR containers for responsive sizing
    const girContainers = document.querySelectorAll(
        ".gir-board, .section-block"
    );
    girContainers.forEach((container) => {
        new ResizeObserver(() => {
            // Trigger responsive updates for GIR nodes
            container.querySelectorAll(".node").forEach((node) => {
                node.style.fontSize = window.innerWidth <= 1200 ? "11px" : "";
            });
        }).observe(container);
    });

    // Function to apply responsive sizing to all nodes
    function applyResponsiveSizing() {
        const isSmallScreen = window.innerWidth <= 1200;
        const allNodes = document.querySelectorAll(".node");

        allNodes.forEach((node) => {
            if (isSmallScreen) {
                node.style.padding = "10px 10px 10px 12px";
                const code = node.querySelector(".code");
                const label = node.querySelector(".label");
                if (code) code.style.fontSize = "13px";
                if (label) label.style.fontSize = "11px";
                if (code) code.style.marginBottom = "4px";
            } else {
                node.style.padding = "";
                const code = node.querySelector(".code");
                const label = node.querySelector(".label");
                if (code) code.style.fontSize = "";
                if (label) label.style.fontSize = "";
                if (code) code.style.marginBottom = "";
            }
        });
    }

    // Apply responsive sizing on load and resize
    applyResponsiveSizing();
    window.addEventListener("resize", applyResponsiveSizing);

    if (searchInput) searchInput.addEventListener("input", applyVisibility);
    if (resetBtn) resetBtn.addEventListener("click", clearAll);
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") clearAll();
    });
    infoClose.addEventListener("click", hideInfo);
    // clicking outside the panel but inside board does not close it; Reset/ESC will.

    // Panning (not on interactive controls)
    let isPanning = false,
        sx = 0,
        sy = 0,
        sl = 0,
        st = 0;
    stage.addEventListener("pointerdown", (e) => {
        if (e.button !== 0 && e.button !== 1) return;
        if (e.target.closest(".node, input, button, .info")) return;
        isPanning = true;
        sx = e.clientX;
        sy = e.clientY;
        sl = stage.scrollLeft;
        st = stage.scrollTop;
        stage.style.cursor = "grabbing";
        stage.setPointerCapture(e.pointerId);
    });
    stage.addEventListener("pointermove", (e) => {
        if (!isPanning) return;
        stage.scrollLeft = sl - (e.clientX - sx);
        stage.scrollTop = st - (e.clientY - sy);
    });
    stage.addEventListener("pointerup", () => {
        isPanning = false;
        stage.style.cursor = "default";
    });
})();
