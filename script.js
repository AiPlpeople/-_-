document.addEventListener("DOMContentLoaded", () => {
  // 1. Header Sticky Effect
  const header = document.getElementById("siteHeader");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // 2. Gateway 3-Column Interactive Hover & Click
  const gatewayCols = document.querySelectorAll(".gateway-col");
  gatewayCols.forEach((col) => {
    col.addEventListener("mouseenter", () => {
      gatewayCols.forEach((c) => c.classList.remove("active"));
      col.classList.add("active");
    });

    col.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      const link = col.querySelector(".gateway-link");
      if (link) {
        window.location.href = link.getAttribute("href");
      }
    });
  });

  // 3. Business Portfolio Category Filter
  const filterChips = document.querySelectorAll(".filter-chip");
  const bizCards = document.querySelectorAll(".biz-card");

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.dataset.filter;

      filterChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");

      bizCards.forEach((card) => {
        const category = card.dataset.category;
        if (filter === "all" || category === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // 4. PR Video Pill Filter
  const mediaPills = document.querySelectorAll(".media-pill");
  const videoItems = document.querySelectorAll(".media-video-item");

  mediaPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const vfilter = pill.dataset.vfilter;
      mediaPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");

      videoItems.forEach((item) => {
        const vcat = item.dataset.vcat;
        if (vfilter === "all" || vcat === vfilter) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });

  // 5. Scroll-Reactive Chronological History (Past -> Present)
  const historySteps = document.querySelectorAll(".history-step");
  const activeBigYear = document.getElementById("activeBigYear");
  const activeStageBadge = document.getElementById("activeStageBadge");
  const activeStageTitle = document.getElementById("activeStageTitle");
  const historyScrollBar = document.getElementById("historyScrollBar");
  const streamLineFill = document.getElementById("streamLineFill");
  const eraJumpBtns = document.querySelectorAll(".era-jump-btn");

  if (historySteps.length > 0 && activeBigYear) {
    function updateHistoryOnScroll() {
      const triggerY = window.innerHeight * 0.48;
      let activeIndex = 0;

      historySteps.forEach((step, idx) => {
        const rect = step.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.82) {
          step.classList.add("revealed");
        }
        if (rect.top <= triggerY) {
          activeIndex = idx;
        }
      });

      historySteps.forEach((step, idx) => {
        step.classList.toggle("current", idx === activeIndex);
      });

      const currentStep = historySteps[activeIndex];
      const newYear = currentStep.dataset.year;
      if (activeBigYear.textContent !== newYear) {
        activeBigYear.textContent = newYear;
        activeBigYear.classList.add("year-bump");
        setTimeout(() => activeBigYear.classList.remove("year-bump"), 220);
      }
      if (activeStageBadge) activeStageBadge.textContent = currentStep.dataset.stage;
      if (activeStageTitle) activeStageTitle.textContent = currentStep.dataset.title;

      const progressPct = ((activeIndex + 1) / historySteps.length) * 100;
      if (historyScrollBar) historyScrollBar.style.width = `${progressPct}%`;
      if (streamLineFill) streamLineFill.style.height = `${progressPct}%`;

      // Highlight matching Era Roadmap Node & Track Fill
      const stageText = currentStep.dataset.stage || "";
      const roadmapTrackFill = document.getElementById("roadmapTrackFill");
      let currentStageIdx = 0;
      if (stageText.includes("STAGE 02")) currentStageIdx = 1;
      if (stageText.includes("STAGE 03")) currentStageIdx = 2;

      eraJumpBtns.forEach((btn, i) => {
        btn.classList.toggle("active", i === currentStageIdx);
        btn.classList.toggle("passed", i < currentStageIdx);
      });

      if (roadmapTrackFill) {
        const trackPct = currentStageIdx === 0 ? 0 : currentStageIdx === 1 ? 50 : 100;
        roadmapTrackFill.style.width = `${trackPct}%`;
      }
    }

    window.addEventListener("scroll", updateHistoryOnScroll, { passive: true });
    updateHistoryOnScroll();

    eraJumpBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetEl = document.getElementById(btn.dataset.eraTarget);
        if (targetEl) {
          const y = targetEl.getBoundingClientRect().top + window.scrollY - 150;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      });
    });
  }

  // 6. Technology & Certificates Page Filter
  const certFilterBtns = document.querySelectorAll(".cert-filter-btn");
  const certDocItems = document.querySelectorAll(".tc-doc-item");

  certFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cfilter = btn.dataset.cfilter;
      certFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      certDocItems.forEach((item) => {
        const ccat = item.dataset.ccat;
        if (cfilter === "all" || ccat === cfilter) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });

  // 7. Scroll-Reactive Clients Showcase (clients.html)
  const clientBlocks = document.querySelectorAll(".client-scroll-block");
  const activeClientNum = document.getElementById("activeClientNum");
  const activeClientName = document.getElementById("activeClientName");
  const activeClientBadge = document.getElementById("activeClientBadge");
  const activeClientDesc = document.getElementById("activeClientDesc");
  const clientScrollBar = document.getElementById("clientScrollBar");
  const clientRoadmapFill = document.getElementById("clientRoadmapFill");
  const clientJumpBtns = document.querySelectorAll(".client-jump-btn");

  if (clientBlocks.length > 0 && activeClientNum) {
    // Assign staggered transition delays to logo cells inside each block
    clientBlocks.forEach((block) => {
      const cells = block.querySelectorAll(".c-reveal-cell");
      cells.forEach((cell, i) => {
        cell.style.transitionDelay = `${Math.min(i * 35, 500)}ms`;
      });
    });

    function updateClientsOnScroll() {
      const triggerY = window.innerHeight * 0.48;
      let activeIdx = 0;

      clientBlocks.forEach((block, idx) => {
        const rect = block.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          block.classList.add("revealed");
        }
        if (rect.top <= triggerY) {
          activeIdx = idx;
        }
      });

      clientBlocks.forEach((block, idx) => {
        block.classList.toggle("current", idx === activeIdx);
      });

      const currentBlock = clientBlocks[activeIdx];
      const newNum = currentBlock.dataset.cnum;
      if (activeClientNum.textContent !== newNum) {
        activeClientNum.textContent = newNum;
        activeClientNum.classList.add("num-bump");
        setTimeout(() => activeClientNum.classList.remove("num-bump"), 220);
      }
      if (activeClientName) activeClientName.textContent = currentBlock.dataset.cname;
      if (activeClientBadge) activeClientBadge.textContent = currentBlock.dataset.cbadge;
      if (activeClientDesc) activeClientDesc.textContent = currentBlock.dataset.cdesc;

      const progressPct = ((activeIdx + 1) / clientBlocks.length) * 100;
      if (clientScrollBar) clientScrollBar.style.width = `${progressPct}%`;

      clientJumpBtns.forEach((btn, i) => {
        btn.classList.toggle("active", i === activeIdx);
        btn.classList.toggle("passed", i < activeIdx);
      });

      if (clientRoadmapFill) {
        const trackPct = activeIdx === 0 ? 0 : activeIdx === 1 ? 50 : 100;
        clientRoadmapFill.style.width = `${trackPct}%`;
      }
    }

    window.addEventListener("scroll", updateClientsOnScroll, { passive: true });
    updateClientsOnScroll();

    clientJumpBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetEl = document.getElementById(btn.dataset.clientTarget);
        if (targetEl) {
          const y = targetEl.getBoundingClientRect().top + window.scrollY - 140;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      });
    });
  }
});
