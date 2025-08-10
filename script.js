            (function () {
                // --- Data ------------------------------------------------------------
                const nodes = {
                    A6_100A: {
                        code: "6.100A",
                        label: "Introduction to Computer Science Programming in Python",
                        title: "Introduction to CS Programming in Python",
                        area: "ee",
                        color: "var(--ee)",
                        description:
                            "Introduction to computer science and programming. Students develop skills to program and use computational techniques to solve problems. Topics include: the notion of computation, Python, simple algorithms and data structures, object-oriented programming, testing and debugging, and algorithmic complexity. Lectures are viewed outside of class; in-class time is dedicated to problem-solving and discussion. Combination of 6.100A and 6.100B (or 16.C20) counts as REST subject.",
                        why: "Required as part of the four fundamental subjects. Already ASEd.",
                    },
                    A8_01: {
                        code: "8.01",
                        label: "Physics I",
                        title: "Physics I",
                        area: "phys",
                        color: "var(--phys)",
                        description:
                            "Introduces classical mechanics. Space and time: straight-line kinematics; motion in a plane; forces and static equilibrium; particle dynamics, with force and conservation of momentum; relative inertial frames and non-inertial force; work, potential energy and conservation of energy; kinetic theory and the ideal gas; rigid bodies and rotational dynamics; vibrational motion; conservation of angular momentum; central force motions; fluid mechanics. Subject taught using the TEAL (Technology-Enabled Active Learning) format which features students working in groups of three, discussing concepts, solving problems, and doing table-top experiments with the aid of computer data acquisition and analysis.",
                        why: "Prerequisite for other classes.",
                    },
                    A18_01: {
                        code: "18.01",
                        label: "Calculus I",
                        title: "Calculus I",
                        area: "math",
                        color: "var(--math)",
                        description:
                            "Differentiation and integration of functions of one variable, with applications. Informal treatment of limits and continuity. Differentiation: definition, rules, application to graphing, rates, approximations, and extremum problems. Indefinite integration; separable first-order differential equations. Definite integral; fundamental theorem of calculus. Applications of integration to geometry and science. Elementary functions. Techniques of integration. Polar coordinates. L'Hopital's rule. Improper integrals. Infinite series: geometric, p-harmonic, simple comparison tests, power series for some elementary functions.",
                        why: "Prerequisite for other classes.",
                    },
                    A6_1904: {
                        code: "6.1904",
                        label: "Introduction to Low-level Programming in C and Assembly",
                        title: "Intro to Low-level Programming",
                        area: "ee",
                        color: "var(--ee)",
                        description:
                            "Introduction to C and assembly language for students coming from a Python background (6.100A). Studies the C language, focusing on memory and associated topics including pointers, how different data structures are stored in memory, the stack, and the heap in order to build a strong understanding of the constraints involved in manipulating complex data structures in modern computational systems. Studies assembly language to facilitate a firm understanding of how high-level languages are translated to machine-level instructions.",
                        why: "Required as part of the four fundamental subjects. Could be 6.1903 instead.",
                    },
                    A6_3000: {
                        code: "6.3000",
                        label: "Signal Processing",
                        title: "Signal Processing",
                        area: "ee",
                        color: "var(--ee)",
                        description:
                            "Fundamentals of signal processing, focusing on the use of Fourier methods to analyze and process signals such as sounds and images. Topics include Fourier series, Fourier transforms, the Discrete Fourier Transform, sampling, convolution, deconvolution, filtering, noise reduction, and compression. Applications draw broadly from areas of contemporary interest with emphasis on both analysis and design.",
                        why: "Prerequisite for 6.9000.",
                    },
                    A6_1200: {
                        code: "6.1200",
                        label: "Mathematics for Computer Science",
                        title: "Mathematics for Computer Science",
                        area: "ee",
                        color: "var(--ee)",
                        description:
                            "Elementary discrete mathematics for science and engineering, with a focus on mathematical tools and proof techniques useful in computer science. Topics include logical notation, sets, relations, elementary graph theory, state machines and invariants, induction and proofs by contradiction, recurrences, asymptotic notation, elementary analysis of algorithms, elementary number theory and cryptography, permutations and combinations, counting tools, and discrete probability.",
                        why: "Required as part of the four fundamental subjects. Could be 6.120A instead but 6.1200 includes probability which fills prereqs for 6.1210.",
                    },
                    A8_02: {
                        code: "8.02",
                        label: "Physics II",
                        title: "Physics II",
                        area: "phys",
                        color: "var(--phys)",
                        description:
                            "Introduction to electromagnetism and electrostatics: electric charge, Coulomb's law, electric structure of matter; conductors and dielectrics. Concepts of electrostatic field and potential, electrostatic energy. Electric currents, magnetic fields and Ampere's law. Magnetic materials. Time-varying fields and Faraday's law of induction. Basic electric circuits. Electromagnetic waves and Maxwell's equations. Subject taught using the TEAL (Technology Enabled Active Learning) studio format which utilizes small group interaction and current technology to help students develop intuition about, and conceptual models of, physical phenomena.",
                        why: "Prerequisite for other classes.",
                    },
                    A18_02: {
                        code: "18.02",
                        label: "Calculus II",
                        title: "Calculus II",
                        area: "math",
                        color: "var(--math)",
                        description:
                            "Calculus of several variables. Vector algebra in 3-space, determinants, matrices. Vector-valued functions of one variable, space motion. Scalar functions of several variables: partial differentiation, gradient, optimization techniques. Double integrals and line integrals in the plane; exact differentials and conservative fields; Green's theorem and applications, triple integrals, line and surface integrals in space, Divergence theorem, Stokes' theorem; applications.",
                        why: "Prerequisite for other classes.",
                    },
                    A6_1210: {
                        code: "6.1210",
                        label: "Introduction to Algorithms",
                        title: "Introduction to Algorithms",
                        area: "ee",
                        color: "var(--ee)",
                        description:
                            "Introduction to mathematical modeling of computational problems, as well as common algorithms, algorithmic paradigms, and data structures used to solve these problems. Emphasizes the relationship between algorithms and programming, and introduces basic performance measures and analysis techniques for these problems. Enrollment may be limited.",
                        why: "Required as part of the four fundamental subjects.",
                    },
                    A6_1910: {
                        code: "6.1910",
                        label: "Computation Structures",
                        title: "Computation Structures",
                        area: "ee",
                        color: "var(--ee)",
                        description:
                            "Provides an introduction to the design of digital systems and computer architecture. Emphasizes expressing all hardware designs in a high-level hardware description language and synthesizing the designs. Topics include combinational and sequential circuits, instruction set abstraction for programmable hardware, single-cycle and pipelined processor implementations, multi-level memory hierarchies, virtual memory, exceptions and I/O, and parallel systems.",
                        why: "Required as part of the four system design subjects.",
                    },
                    A6_2000: {
                        code: "6.2000",
                        label: "Electrical Circuits: Modeling and Design of Physical Systems",
                        title: "Electrical Circuits",
                        area: "ee",
                        color: "var(--ee)",
                        description:
                            "Fundamentals of linear systems, and abstraction modeling of multi-physics lumped and distributed systems using lumped electrical circuits. Linear networks involving independent and dependent sources, resistors, capacitors, and inductors. Extensions to include operational amplifiers and transducers. Dynamics of first- and second-order networks; analysis and design in the time and frequency domains; signal and energy processing applications. Design exercises. Weekly laboratory with microcontroller and transducers.",
                        why: "Required as part of the four system design subjects.",
                    },
                    A6_3700: {
                        code: "6.3700",
                        label: "Introduction to Probability",
                        title: "Introduction to Probability",
                        area: "math",
                        color: "var(--math)",
                        description:
                            "An introduction to probability theory, the modeling and analysis of probabilistic systems, and elements of statistical inference. Probabilistic models, conditional probability. Discrete and continuous random variables. Expectation and conditional expectation, and further topics about random variables. Limit Theorems. Bayesian estimation and hypothesis testing. Elements of classical statistical inference. Bernoulli and Poisson processes. Markov chains. Students taking graduate version complete additional assignments.",
                        why: "Required as part of the two math subjects. Could be 18.05 instead but that class is bad. Could also be 6.3800 instead",
                    },
                    A18_06: {
                        code: "18.06",
                        label: "Linear Algebra",
                        title: "Linear Algebra",
                        area: "math",
                        color: "var(--math)",
                        description:
                            "Basic subject on matrix theory and linear algebra, emphasizing topics useful in other disciplines, including systems of equations, vector spaces, determinants, eigenvalues, singular value decomposition, and positive definite matrices. Applications to least-squares approximations, stability of differential equations, networks, Fourier transforms, and Markov processes. Uses linear algebra software. Compared with 18.700, more emphasis on matrix algorithms and many applications.",
                        why: "Required as part of the two math subjects. Could also be 18.C06 instead",
                    },
                    A6_3100: {
                        code: "6.3100",
                        label: "Dynamical System Modeling and Control Design",
                        title: "Control Design",
                        area: "ee",
                        color: "var(--ee)",
                        description:
                            "A learn-by-design introduction to modeling and control of discrete- and continuous-time systems, from intuition-building analytical techniques to more computational and data-centric strategies. Topics include: linear difference/differential equations (natural frequencies, transfer functions); controller metrics (stability, tracking, disturbance rejection); analytical techniques (PID, root-loci, lead-lag, phase margin); computational strategies (state-space, eigen-placement, LQR); and data-centric approaches (state estimation, regression, and identification). Concepts are introduced with lectures and online problems, and then mastered during weekly labs. In lab, students model, design, test, and explain systems and controllers involving sensors, actuators, and a microcontroller (e.g., optimizing thrust-driven positioners or stabilizing magnetic levitators). Students taking graduate version complete additional problems and labs.",
                        why: "Required as part of the four system design subjects.",
                    },
                    A6_9000: {
                        code: "6.9000",
                        label: "Engineering for Impact",
                        title: "Engineering for Impact",
                        area: "impact",
                        color: "var(--impact)",
                        description:
                            "Students work in teams to engineer hardware/software systems that solve important, challenging real-world problems. In pursuit of these projects, students engage at every step of the full-stack development process, from printed circuit board design to firmware to server to industrial design. Teams design and build functional prototypes of complete hardware/software systems. Grading is based on individual- and team-based elements. Satisfies 10 units of Institute Laboratory credit. Enrollment may be limited due to staffing and space requirements.",
                        why: "Required as part of the four system design subjects.",
                    },
                };

                const tiers = [
                    ["A6_100A"],
                    ["A8_01", "A18_01", "A6_1904"],
                    ["A6_1200", "A8_02", "A18_02"],
                    [
                        "A6_1210",
                        "A6_1910",
                        "A6_2000",
                        "A6_3700",
                        "A18_06",
                        "A6_3000",
                    ],
                    ["A6_3100", "A6_9000"],
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
                    ["A18_01", "A18_02"],
                    ["A18_02", "A6_3700"],
                    ["A18_02", "A18_06"],
                    ["A6_1910", "A6_9000"],
                    ["A6_2000", "A6_9000"],
                    ["A6_3000", "A6_9000"],
                    ["A6_100A", "A6_3000"],
                ];

                // --- Elements -------------------------------------------------------
                const grid = document.getElementById("grid");
                const svg = document.getElementById("edges");
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

                // --- State ----------------------------------------------------------
                const positions = {}; // id -> {cx,cy}
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
                        : area === "impact"
                        ? "impact"
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
                        : area === "impact"
                        ? cssVar("--impact")
                        : cssVar("--ee");
                }

                function makeNodeEl(id) {
                    const d = nodes[id];
                    const el = document.createElement("div");
                    el.className = `node ${areaClass(d.area)}`;
                    el.id = id;
                    el.tabIndex = 0;
                    el.setAttribute("role", "button");
                    el.setAttribute(
                        "aria-label",
                        `${d.code}: ${d.title || d.label}`
                    );
                    el.innerHTML = `<span class="code">${d.code}</span><div class="label">${d.label}</div>`;
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
                    return el;
                }

                function layout() {
                    grid.innerHTML = "";
                    tiers.forEach((col, i) => {
                        const tier = document.createElement("div");
                        tier.className = "tier";
                        tier.dataset.title = i === 0 ? "ASE" : `Tier ${i}`;
                        grid.appendChild(tier);
                        col.forEach((id) => tier.appendChild(makeNodeEl(id)));
                    });
                    requestAnimationFrame(positionAll);
                }

                function positionAll() {
                    const gridRect = grid.getBoundingClientRect();
                    svg.setAttribute(
                        "viewBox",
                        `0 0 ${gridRect.width} ${gridRect.height}`
                    );
                    svg.setAttribute("width", gridRect.width);
                    svg.setAttribute("height", gridRect.height);
                    const base = grid.getBoundingClientRect();
                    document.querySelectorAll(".node").forEach((el) => {
                        const b = el.getBoundingClientRect();
                        positions[el.id] = {
                            cx: b.left - base.left + b.width / 2,
                            cy: b.top - base.top + b.height / 2,
                        };
                    });
                    drawEdges();
                }

                function shouldDimEdge(from, to) {
                    if (currentSearch) {
                        // Hide all edges when searching unless both nodes match
                        return !(nodeMatches[from] && nodeMatches[to]);
                    }
                    const inIso =
                        !isolatedSet ||
                        (isolatedSet.has(from) && isolatedSet.has(to));
                    const searchOk =
                        !currentSearch || nodeMatches[from] || nodeMatches[to];
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
                        for (const a of ["ee", "math", "phys", "impact"]) {
                            const m = document.createElementNS(
                                "http://www.w3.org/2000/svg",
                                "marker"
                            );
                            m.setAttribute("id", `arrow-${a}`);
                            m.setAttribute("viewBox", "0 0 10 10");
                            m.setAttribute("refX", "9");
                            m.setAttribute("refY", "5");
                            m.setAttribute("markerWidth", "6");
                            m.setAttribute("markerHeight", "6");
                            m.setAttribute("orient", "auto-start-reverse");
                            const poly = document.createElementNS(
                                "http://www.w3.org/2000/svg",
                                "polygon"
                            );
                            poly.setAttribute("points", "0,0 10,5 0,10");
                            poly.setAttribute(
                                "fill",
                                a === "math"
                                    ? cssVar("--math")
                                    : a === "phys"
                                    ? cssVar("--phys")
                                    : a === "impact"
                                    ? cssVar("--impact")
                                    : cssVar("--ee")
                            );
                            m.appendChild(poly);
                            defs.appendChild(m);
                        }
                        svg.appendChild(defs);
                    }

                    if (!svg._edgePaths) svg._edgePaths = {};
                    const edgePaths = svg._edgePaths;

                    edges.forEach(([from, to]) => {
                        const key = `${from}->${to}`;
                        const a = positions[from],
                            b = positions[to];
                        if (!a || !b) return;
                        const dx = b.cx - a.cx,
                            dy = b.cy - a.cy,
                            cx = a.cx + dx * 0.5,
                            cy = a.cy + dy * 0.5 - 18;
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
                        path.setAttribute(
                            "d",
                            `M ${a.cx} ${a.cy} Q ${cx} ${cy} ${b.cx} ${b.cy}`
                        );
                        const cls = areaClass(nodes[from].area);
                        path.setAttribute(
                            "stroke",
                            strokeFor(nodes[from].area)
                        );
                        path.setAttribute("marker-end", `url(#arrow-${cls})`);
                        if (shouldDimEdge(from, to))
                            path.classList.add("dimmed");
                        else path.classList.remove("dimmed");
                    });

                    // Remove stale paths
                    Object.keys(edgePaths).forEach((key) => {
                        if (
                            !edges.some(
                                ([from, to]) => `${from}->${to}` === key
                            )
                        ) {
                            svg.removeChild(edgePaths[key]);
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
                    currentSearch = (searchInput?.value || "")
                        .trim()
                        .toLowerCase();
                    Object.keys(nodes).forEach((id) => {
                        const d = nodes[id];
                        nodeMatches[id] =
                            !currentSearch ||
                            `${d.code} ${d.label}`
                                .toLowerCase()
                                .includes(currentSearch);
                    });
                    document.querySelectorAll(".node").forEach((el) => {
                        const id = el.id;
                        const dimByIso = !!isolatedSet && !isolatedSet.has(id);
                        const dimBySearch = !!currentSearch && !nodeMatches[id];
                        el.classList.toggle("dimmed", dimByIso || dimBySearch);
                    });
                    drawEdges();
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
                    infoTitle.textContent = d.title || d.label || d.code;
                    infoCode.textContent = d.code;
                    infoArea.textContent = d.area.toUpperCase();
                    infoDesc.textContent = d.description || "—";
                    infoWhy.textContent = d.why || "—";
                    const color = d.color || strokeFor(d.area);
                    infoSwatch.style.background = color;
                    info.classList.add("visible");
                }
                function hideInfo() {
                    info.classList.remove("visible");
                }

                // --- Init -----------------------------------------------------------
                layout();
                new ResizeObserver(() => positionAll()).observe(grid);
                window.addEventListener("resize", positionAll);

                if (searchInput)
                    searchInput.addEventListener("input", applyVisibility);
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

                // --- Tests (smoke) --------------------------------------------------
                function assert(cond, msg) {
                    if (!cond) throw new Error(msg);
                }
                function runTests() {
                    try {
                        assert(!!searchInput, "#search exists");
                        assert(!!grid && !!svg, "#grid and #edges exist");
                        const countNodes = Object.keys(nodes).length;
                        const rendered =
                            document.querySelectorAll(".node").length;
                        assert(
                            rendered === countNodes,
                            `rendered ${rendered} nodes (expected ${countNodes})`
                        );
                        positionAll();
                        const pathCount = svg.querySelectorAll("path").length;
                        assert(
                            pathCount === edges.length,
                            `rendered ${pathCount} edges (expected ${edges.length})`
                        );
                        const markerCount =
                            svg.querySelectorAll("defs marker").length;
                        const markerPolys =
                            svg.querySelectorAll("defs polygon").length;
                        const markerPaths =
                            svg.querySelectorAll("defs path").length;
                        assert(
                            markerCount === 4,
                            `expected 4 markers, found ${markerCount}`
                        );
                        assert(
                            markerPolys === 4,
                            `expected 4 polygon arrowheads, found ${markerPolys}`
                        );
                        assert(
                            markerPaths === 0,
                            "marker should not contain path elements"
                        );
                        clearAll();
                        testBadge.textContent = "Tests passed";
                        testBadge.style.color = "#a7f3d0";
                    } catch (e) {
                        testBadge.textContent = "Tests failed: " + e.message;
                        testBadge.style.color = "#fecaca";
                        console.error(e);
                    }
                }
                setTimeout(runTests, 50);
            })();

            (function () {
                const sections = [
                    { title: "Science Core", tiers: [[{}], [{}], [{}], [{}]] },
                    { title: "HASS", tiers: [[{}], [{}], [{}], [{}]] },
                    { title: "Laboratory", tiers: [[{}]] },
                    { title: "REST", tiers: [[{}]] },
                    { title: "Communication", tiers: [[{}]] },
                ];
                const wrap = document.getElementById("girWrap");
                if (!wrap) return;
                sections.forEach((sec) => {
                    const sectionEl = document.createElement("div");
                    sectionEl.className = "gir-section";
                    const h3 = document.createElement("h3");
                    h3.textContent = sec.title;
                    sectionEl.appendChild(h3);
                    const board = document.createElement("div");
                    board.className = "gir-board";
                    const grid = document.createElement("div");
                    grid.className = "gir-grid";
                    board.appendChild(grid);
                    sec.tiers.forEach((tierNodes) => {
                        const tier = document.createElement("div");
                        tier.className = "tier";
                        grid.appendChild(tier);
                        tierNodes.forEach((nodeData) => {
                            const node = document.createElement("div");
                            node.className = "node";
                            if (nodeData.code || nodeData.label) {
                                node.innerHTML = `${
                                    nodeData.code
                                        ? `<span class=\"code\">${nodeData.code}</span>`
                                        : ""
                                }${
                                    nodeData.label
                                        ? `<div class=\"label\">${nodeData.label}</div>`
                                        : ""
                                }`;
                            }
                            tier.appendChild(node);
                        });
                    });
                    sectionEl.appendChild(board);
                    wrap.appendChild(sectionEl);
                });
            })();

