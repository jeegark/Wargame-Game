const BASE_METRICS = {
  stability: 62,
  trust: 55,
  fiscal: 54,
  clarity: 38,
};

const METRIC_META = {
  stability: {
    label: "System Stability",
    shortLabel: "Stability",
    copy: {
      high: "Flows are holding, and the grid can absorb shocks without visible disorder.",
      mid: "The system is still operating, but each new disruption is getting harder to contain.",
      low: "You are running out of safe operating margin.",
    },
  },
  trust: {
    label: "Public Trust",
    shortLabel: "Trust",
    copy: {
      high: "Citizens and firms still believe the response is fair and credible.",
      mid: "Support is conditional. One bad call could trigger backlash.",
      low: "The public is treating resilience asks as failure rather than solidarity.",
    },
  },
  fiscal: {
    label: "Fiscal Headroom",
    shortLabel: "Fiscal",
    copy: {
      high: "You still have room to protect households without exhausting the Treasury.",
      mid: "Emergency spending is mounting and policy space is narrowing.",
      low: "Each extra unit of stability is now painfully expensive.",
    },
  },
  clarity: {
    label: "Attribution Clarity",
    shortLabel: "Clarity",
    copy: {
      high: "You have a credible picture of the threat and how it might spread.",
      mid: "You know enough to act, but not enough to relax.",
      low: "Ambiguity is driving the crisis almost as much as the attack itself.",
    },
  },
};

const TOOLS = [
  {
    id: "society",
    title: "Whole-of-Society Resilience",
    tag: "Recommendation 1",
    description:
      "Treat energy as part of national resilience, so public communication and emergency asks land inside a preparedness culture rather than as panic.",
    setupEffects: { trust: 8, clarity: 2 },
    effectSummary: ["+ Trust", "+ Clarity"],
  },
  {
    id: "reserves",
    title: "Strategic Reserves Reset",
    tag: "Recommendation 2",
    description:
      "Strengthen the old insurance layer with gas storage, long-duration electricity storage, and spare hardware for fast replacement.",
    setupEffects: { stability: 10, fiscal: 2 },
    effectSummary: ["+ Stability", "+ Fiscal"],
  },
  {
    id: "flex",
    title: "Flexibility at Scale",
    tag: "Recommendation 3",
    description:
      "Bring households and businesses into the system through demand flexibility, smart charging, storage, and industrial load shifting.",
    setupEffects: { fiscal: 8, stability: 3 },
    effectSummary: ["+ Fiscal", "+ Stability"],
  },
  {
    id: "renewables",
    title: "Renewables Security Channel",
    tag: "Recommendation 4",
    description:
      "Pull wind and solar operators deeper into shared cyber, escalation, and emergency-response channels rather than leaving them isolated.",
    setupEffects: { clarity: 10, stability: 2 },
    effectSummary: ["+ Clarity", "+ Stability"],
  },
  {
    id: "thresholds",
    title: "Lower Reporting Thresholds",
    tag: "Recommendation 5",
    description:
      "Treat distributed assets seriously by lowering thresholds for reporting, telemetry sharing, and coordinated defensive action.",
    setupEffects: { clarity: 8, trust: 1 },
    effectSummary: ["+ Clarity", "+ Trust"],
  },
  {
    id: "northsea",
    title: "North Sea Coalition",
    tag: "Recommendation 6",
    description:
      "Deepen regional collaboration to protect undersea cables, pipelines, and offshore power links in the North Sea.",
    setupEffects: { stability: 6, clarity: 6 },
    effectSummary: ["+ Stability", "+ Clarity"],
  },
];

const EVENTS = [
  {
    id: "pipeline-1",
    phase: "Scenario One",
    counterLabel: "1 / 6 decisions",
    title: "Explosions at the Sleipner link",
    lead:
      "It is the coldest January in five years. Russian gas has vanished from the global market, China is absorbing more Qatari LNG, and prices are near 2022 stress levels. Then the UK loses 18% of winter gas supply in an unattributable blast near a North Sea transport pipeline.",
    signals: ["18% winter gas supply lost", "Cold snap", "Global LNG market strained"],
    prompt:
      "What do you do in the first six hours, before the market panic hardens into a political crisis?",
    pageNote: "Report spine: scenario summary, pp. 14-16",
    choices: [
      {
        id: "pipeline-buffer",
        title: "Release buffers and coordinate allies immediately",
        description:
          "Treat the shock as a whole-system event: lean on storage, open regional coordination channels, and prepare flexibility messaging at the same time.",
        tags: ["coordination", "supply"],
        effects: { stability: 5, fiscal: -3, trust: 1, clarity: 2 },
        bonuses: [
          {
            tool: "reserves",
            effects: { stability: 4, fiscal: 1 },
            note: "Strategic reserves buy time before price panic fully lands.",
          },
          {
            tool: "northsea",
            effects: { stability: 2, clarity: 3 },
            note: "North Sea coordination sharpens the operating picture and reduces delay.",
          },
        ],
        result:
          "You slow the shock and create a credible operating picture, but you have used real resilience capital to do it.",
      },
      {
        id: "pipeline-buy",
        title: "Buy replacement LNG and shield bills",
        description:
          "Keep normality intact by paying the spot-market price and moving early toward broad household and business protection.",
        tags: ["supply", "cost"],
        effects: { stability: 8, fiscal: -14, trust: 4, clarity: 0 },
        result:
          "Supply holds for now, but the insurance policy is exactly what the report warns about: pay more, then pay more again.",
      },
      {
        id: "pipeline-hold",
        title: "Wait for firmer attribution before moving hard",
        description:
          "Avoid escalation and keep public lines narrow until you know whether this was sabotage, failure, or a false signal.",
        tags: ["attribution"],
        effects: { stability: -8, fiscal: 2, trust: -4, clarity: 8 },
        bonuses: [
          {
            tool: "thresholds",
            effects: { clarity: 2 },
            note: "Stronger telemetry and reporting make delay less blind than it would otherwise be.",
          },
        ],
        result:
          "You reduce the risk of saying the wrong thing too early, but hesitation amplifies market stress and public unease.",
      },
    ],
  },
  {
    id: "pipeline-2",
    phase: "Scenario One",
    counterLabel: "2 / 6 decisions",
    title: "The public line",
    lead:
      "The system is still standing, but the price signal is brutal and ministers want a public posture. The core dilemma from the report is now visible: do you treat citizens as participants in resilience, or as people who must be kept unaware while the Treasury absorbs the pain?",
    signals: ["Price spike", "Media pressure", "Grey-zone ambiguity"],
    prompt:
      "Which signal do you send to the country and the market?",
    pageNote: "Report spine: cost, demand, and public resilience, pp. 19-20",
    choices: [
      {
        id: "pipeline-public-flex",
        title: "Openly ask for flexibility and explain the threat",
        description:
          "Issue a national flexibility appeal, explain the pressure on gas, and treat households and firms as actors in the response rather than spectators.",
        tags: ["demand", "public", "coordination"],
        effects: { stability: 4, fiscal: 6, trust: -1, clarity: 2 },
        bonuses: [
          {
            tool: "society",
            effects: { trust: 6 },
            note: "Whole-of-society preparation means the appeal feels like shared resilience, not improvised rationing.",
          },
          {
            tool: "flex",
            effects: { stability: 3, fiscal: 2 },
            note: "A live flexibility market turns public cooperation into measurable system relief.",
          },
        ],
        result:
          "You accept that resilience is behavioural as well as technical. If people are prepared, this is a powerful release valve.",
      },
      {
        id: "pipeline-silent-support",
        title: "Subsidise broadly and avoid asking for behaviour change",
        description:
          "Preserve the feel of business as usual and buy stability with visible support rather than visible sacrifice.",
        tags: ["supply", "cost"],
        effects: { stability: 2, fiscal: -12, trust: 3, clarity: -2 },
        result:
          "You mute the politics now, but deepen the expensive-stability trap the report says is no longer sustainable.",
      },
      {
        id: "pipeline-accuse",
        title: "Publicly accuse Russia before the picture is complete",
        description:
          "Frame the blast as hostile action, harden the message, and try to deter further grey-zone probing with visible resolve.",
        tags: ["attribution", "coordination"],
        effects: { stability: -2, fiscal: -1, trust: 0, clarity: -8 },
        bonuses: [
          {
            tool: "northsea",
            effects: { clarity: 3, trust: 2 },
            note: "Shared monitoring data gives the accusation more grounding than it would otherwise have.",
          },
        ],
        result:
          "Resolve without evidence carries its own strategic cost. You may stiffen posture, but ambiguity can punish overconfidence.",
      },
    ],
  },
  {
    id: "wind-1",
    phase: "Scenario Two",
    counterLabel: "3 / 6 decisions",
    title: "A wind farm goes dark",
    lead:
      "A control room loses contact with all 174 turbines at a major offshore wind farm. Operators shut the site to protect hardware, pulling 1.2 GW off the system. Forensics later point toward a compromised software update from the turbine manufacturer.",
    signals: ["174 turbines offline", "1.2 GW lost", "Cyber cause unclear"],
    prompt:
      "How do you handle a distributed-asset cyber event that is serious, but not yet system-wide?",
    pageNote: "Report spine: wind-farm scenario and distributed resilience, pp. 14, 18",
    choices: [
      {
        id: "wind-isolate-share",
        title: "Isolate, ground the software, and force log sharing",
        description:
          "Take the immediate generation hit, freeze the compromised update path, and make operators share telemetry quickly.",
        tags: ["cyber", "coordination"],
        effects: { stability: -2, fiscal: 0, trust: 1, clarity: 8 },
        bonuses: [
          {
            tool: "renewables",
            effects: { stability: 2, clarity: 4 },
            note: "Existing renewable security channels make shared response far faster and less improvised.",
          },
          {
            tool: "thresholds",
            effects: { clarity: 3 },
            note: "Lower thresholds surface copycat signals across smaller assets sooner.",
          },
        ],
        result:
          "You sacrifice short-term output to build a real picture of the threat. That picture may matter more than the first lost megawatt.",
      },
      {
        id: "wind-quiet-fix",
        title: "Keep it operator-led and quiet while the grid compensates",
        description:
          "Because the system can survive one site loss, let the operator work the problem and avoid turning a contained incident into a national story.",
        tags: ["supply"],
        effects: { stability: 4, fiscal: 0, trust: -4, clarity: -8 },
        result:
          "The grid stays smoother in the moment, but you learn less and leave room for contagion elsewhere.",
      },
      {
        id: "wind-fleet-audit",
        title: "Order precautionary audits across offshore fleets",
        description:
          "Assume a wider compromise path may exist and accept controlled generation losses now to reduce the probability of a bigger coordinated hit later.",
        tags: ["cyber", "storage"],
        effects: { stability: -5, fiscal: -2, trust: 2, clarity: 6 },
        bonuses: [
          {
            tool: "reserves",
            effects: { stability: 2 },
            note: "Extra reserve capacity makes the preventive derating easier to absorb.",
          },
          {
            tool: "flex",
            effects: { stability: 2, fiscal: 1 },
            note: "Demand flexibility offsets the operational cost of caution.",
          },
        ],
        result:
          "You treat a single compromised update as a warning shot instead of a one-off inconvenience.",
      },
    ],
  },
  {
    id: "wind-2",
    phase: "Scenario Two",
    counterLabel: "4 / 6 decisions",
    title: "Copycat risk across smaller assets",
    lead:
      "Forensics suggest the same approach could be used against many smaller wind and solar sites at once. The report warns that renewables are physically resilient, but that distributed cyber risk can still accumulate into a dangerous critical mass.",
    signals: ["Distributed contagion risk", "Board-level visibility gap", "Procedures still immature"],
    prompt:
      "What structural change do you make while the threat is still visible?",
    pageNote: "Report spine: distributed threat vectors and reporting gaps, pp. 18-19",
    choices: [
      {
        id: "wind-common-channel",
        title: "Lower thresholds and create a common incident channel",
        description:
          "Pull smaller renewable operators into shared reporting, escalation, and defensive coordination instead of reserving that machinery for the largest sites only.",
        tags: ["cyber", "coordination"],
        effects: { stability: 4, fiscal: -1, trust: 1, clarity: 6 },
        bonuses: [
          {
            tool: "thresholds",
            effects: { stability: 2, clarity: 4 },
            note: "Because the threshold change already exists, scaling the channel is fast and credible.",
          },
          {
            tool: "renewables",
            effects: { clarity: 2 },
            note: "Renewable operators already know where to send alerts and what good practice looks like.",
          },
        ],
        result:
          "You turn a fragmented cyber landscape into something the state can actually see and shape.",
      },
      {
        id: "wind-prioritise-largest",
        title: "Focus security resources only on the largest assets",
        description:
          "Keep the national effort concentrated on the sites most likely to matter in megawatt terms and assume smaller operators can manage themselves.",
        tags: ["cyber", "cost"],
        effects: { stability: -5, fiscal: 2, trust: -1, clarity: -4 },
        result:
          "This saves money now, but reproduces the blind spot the report says distributed threats are creating.",
      },
      {
        id: "wind-storage-flex",
        title: "Accelerate storage and flexibility dispatch",
        description:
          "Use the incident as a trigger to make the system less brittle overall, so variable generation shocks have more cushions than gas or curtailment.",
        tags: ["demand", "storage"],
        effects: { stability: 6, fiscal: 4, trust: 3, clarity: 1 },
        bonuses: [
          {
            tool: "reserves",
            effects: { stability: 4 },
            note: "Long-duration reserves turn the philosophy of resilience into real operating headroom.",
          },
          {
            tool: "flex",
            effects: { stability: 2, fiscal: 3 },
            note: "Participation from homes and businesses turns flexibility into a serious strategic tool.",
          },
        ],
        result:
          "You respond to cyber uncertainty by giving the system more room to bend instead of asking gas to carry the entire burden.",
      },
    ],
  },
  {
    id: "terminal-1",
    phase: "Scenario Three",
    counterLabel: "5 / 6 decisions",
    title: "Malware at a gas terminal",
    lead:
      "Malware is found in a peripheral system attached to a major gas terminal's master control unit. Pipelines fall into a no-flow state while engineers assess whether safety protocols were compromised. The site handles roughly a quarter of UK gas imports.",
    signals: ["Quarter of UK gas imports at risk", "No-flow state", "SCADA compromise suspected"],
    prompt:
      "Do you prioritise speed, certainty, or a hybrid restart path?",
    pageNote: "Report spine: gas-terminal scenario and known procedures, pp. 14, 17-18",
    choices: [
      {
        id: "terminal-hold",
        title: "Hold the shutdown and shift demand instead",
        description:
          "Keep the site dark until forensics clear safety systems, reroute what you can, and lean harder on industrial demand response.",
        tags: ["cyber", "demand", "coordination"],
        effects: { stability: -3, fiscal: 5, trust: 2, clarity: 8 },
        bonuses: [
          {
            tool: "flex",
            effects: { stability: 4, trust: 1 },
            note: "Demand-side participation turns a painful hold into a manageable one.",
          },
          {
            tool: "reserves",
            effects: { stability: 3 },
            note: "Stored energy buys the forensic team time they would not otherwise have.",
          },
          {
            tool: "society",
            effects: { trust: 1 },
            note: "Public resilience framing reduces the political cost of asking the system to bend.",
          },
        ],
        result:
          "You privilege certainty over speed, accepting near-term strain to avoid a larger safety and credibility failure later.",
      },
      {
        id: "terminal-fast-restart",
        title: "Push for a fast restart under pressure",
        description:
          "Minimise the immediate supply hit and assume the attack was narrow enough to manage while the terminal comes back online.",
        tags: ["supply"],
        effects: { stability: 7, fiscal: -2, trust: -6, clarity: -10 },
        result:
          "The system breathes easier immediately, but you are betting national credibility on incomplete forensic confidence.",
      },
      {
        id: "terminal-segment",
        title: "Segment the terminal and restore partial flow",
        description:
          "Split the difference: isolate the affected architecture, restore partial capacity where you can, and pull in a broad cyber team.",
        tags: ["cyber", "coordination"],
        effects: { stability: 4, fiscal: -2, trust: 1, clarity: 6 },
        bonuses: [
          {
            tool: "renewables",
            effects: { clarity: 1 },
            note: "Cross-operator cyber habits make coordinated response less improvised.",
          },
        ],
        result:
          "You neither panic nor gamble. The partial restart is slower than ministers want, but easier to defend.",
      },
    ],
  },
  {
    id: "terminal-2",
    phase: "Scenario Three",
    counterLabel: "6 / 6 decisions",
    title: "The rest of winter",
    lead:
      "The crisis is now strategic rather than merely operational. Prices remain painful, the public is watching, and the report's core warning is live in front of you: if gas remains the default shock absorber, the UK can survive and still lose.",
    signals: ["Gas still setting the system's mood", "Public patience thinning", "Treasury under strain"],
    prompt:
      "What package defines the rest of your winter response?",
    pageNote: "Report spine: concluding argument and recommendations, pp. 21-26",
    choices: [
      {
        id: "winter-buy-normality",
        title: "Buy normality at almost any cost",
        description:
          "Prioritise supply assurance, broad bill shielding, and visible continuity even if that means taking the full fiscal hit.",
        tags: ["supply", "cost"],
        effects: { stability: 5, fiscal: -14, trust: 1, clarity: 0 },
        result:
          "You keep the lights on, but the report would treat this as a fragile victory: stability purchased through deeper exposure to coercive price shocks.",
      },
      {
        id: "winter-resilience-model",
        title: "Move to an explicit resilience model",
        description:
          "Use targeted support, open briefings, and flexibility payments so the system leans on participation instead of spot gas alone.",
        tags: ["demand", "public", "coordination"],
        effects: { stability: 5, fiscal: 6, trust: 6, clarity: 4 },
        bonuses: [
          {
            tool: "society",
            effects: { trust: 4 },
            note: "Whole-of-society framing makes the shift politically legible.",
          },
          {
            tool: "flex",
            effects: { stability: 2, fiscal: 4 },
            note: "A real flexibility system means the rhetoric is backed by dispatchable demand reduction.",
          },
        ],
        result:
          "You choose the report's preferred direction: reduce coercive leverage by shrinking the role of panic-priced gas in the response.",
      },
      {
        id: "winter-insurance-layer",
        title: "Rebuild the insurance layer for the next shock",
        description:
          "Invest hard in gas storage, long-duration energy storage, spare hardware, and North Sea coordination so the next winter starts from a stronger base.",
        tags: ["storage", "coordination"],
        effects: { stability: 7, fiscal: 2, trust: 2, clarity: 3 },
        bonuses: [
          {
            tool: "reserves",
            effects: { stability: 4, fiscal: 2 },
            note: "Because reserves were already part of your posture, this scales up quickly instead of starting from scratch.",
          },
          {
            tool: "northsea",
            effects: { clarity: 2 },
            note: "Regional coordination makes physical protection more than a slogan.",
          },
        ],
        result:
          "You act on the report's central synthesis: combine legacy strengths with new tools instead of staging a false choice between them.",
      },
    ],
  },
];

const SOURCE_ITEMS = [
  {
    title: "Scenario frame",
    detail:
      "Cold January, tight LNG market, and three winter attacks drawn from the report's wargame setup.",
    pages: "pp. 14-16",
  },
  {
    title: "Pipeline lesson",
    detail:
      "Legacy gas assets are vulnerable, but they benefit from mature emergency procedures and clearer chains of command.",
    pages: "pp. 17-18",
  },
  {
    title: "Renewables lesson",
    detail:
      "Distributed renewables are harder to break physically, but cyber and coordination gaps can still compound into systemic risk.",
    pages: "pp. 18-19",
  },
  {
    title: "Demand and cost lesson",
    detail:
      "Crisis response often over-relies on keeping supply flowing while underusing flexibility, public participation, and cost-aware demand tools.",
    pages: "pp. 19-20",
  },
  {
    title: "Conclusion",
    detail:
      "The report argues for combining storage, flexibility, shared security channels, and regional coordination to reduce gas-driven coercion.",
    pages: "pp. 21-26",
  },
];

const TOOL_MAP = new Map(TOOLS.map((tool) => [tool.id, tool]));
const MAX_TOOL_SELECTION = 2;

const state = createInitialState();

const elements = {
  jumpToGame: document.getElementById("jumpToGame"),
  phaseChip: document.getElementById("phaseChip"),
  eventCounter: document.getElementById("eventCounter"),
  stageTitle: document.getElementById("stageTitle"),
  stageLead: document.getElementById("stageLead"),
  signalRow: document.getElementById("signalRow"),
  stageBody: document.getElementById("stageBody"),
  progressText: document.getElementById("progressText"),
  progressFill: document.getElementById("progressFill"),
  toolCounter: document.getElementById("toolCounter"),
  toolSummary: document.getElementById("toolSummary"),
  decisionLog: document.getElementById("decisionLog"),
  sourceList: document.getElementById("sourceList"),
  metrics: {
    stability: {
      value: document.getElementById("metric-stability-value"),
      fill: document.getElementById("metric-stability-fill"),
      copy: document.getElementById("metric-stability-copy"),
    },
    trust: {
      value: document.getElementById("metric-trust-value"),
      fill: document.getElementById("metric-trust-fill"),
      copy: document.getElementById("metric-trust-copy"),
    },
    fiscal: {
      value: document.getElementById("metric-fiscal-value"),
      fill: document.getElementById("metric-fiscal-fill"),
      copy: document.getElementById("metric-fiscal-copy"),
    },
    clarity: {
      value: document.getElementById("metric-clarity-value"),
      fill: document.getElementById("metric-clarity-fill"),
      copy: document.getElementById("metric-clarity-copy"),
    },
  },
};

elements.jumpToGame.addEventListener("click", () => {
  document.getElementById("game").scrollIntoView({ behavior: "smooth", block: "start" });
});

elements.stageBody.addEventListener("click", handleStageClick);

render();

function createInitialState() {
  return {
    screen: "prep",
    selectedTools: [],
    metrics: cloneMetrics(BASE_METRICS),
    currentEventIndex: 0,
    pendingResolution: null,
    log: [
      {
        tag: "Briefing",
        title: "Exercise loaded",
        copy: "Choose two tools from the report before the winter crisis starts.",
      },
    ],
    history: [],
    patterns: {
      supply: 0,
      cost: 0,
      demand: 0,
      public: 0,
      coordination: 0,
      cyber: 0,
      storage: 0,
      attribution: 0,
    },
  };
}

function cloneMetrics(source) {
  return Object.fromEntries(Object.entries(source).map(([key, value]) => [key, value]));
}

function render() {
  renderMetrics();
  renderProgress();
  renderToolSummary();
  renderDecisionLog();
  renderSourceList();
  renderStage();
}

function renderMetrics() {
  Object.entries(METRIC_META).forEach(([key, meta]) => {
    const value = state.metrics[key];
    const nodes = elements.metrics[key];
    nodes.value.textContent = `${Math.round(value)}`;
    nodes.fill.style.width = `${value}%`;
    nodes.copy.textContent = getMetricCopy(key, value);
  });
}

function getMetricCopy(metricKey, value) {
  const copy = METRIC_META[metricKey].copy;
  if (value >= 70) return copy.high;
  if (value >= 40) return copy.mid;
  return copy.low;
}

function renderProgress() {
  let completed = 0;
  let label = "Choose two tools to prepare for winter.";

  if (state.screen === "decision") {
    completed = state.currentEventIndex;
    label = `Live scenario: ${EVENTS[state.currentEventIndex].title}`;
  } else if (state.screen === "result") {
    completed = state.currentEventIndex + 1;
    label = `Outcome logged: ${state.pendingResolution.choiceTitle}`;
  } else if (state.screen === "debrief") {
    completed = EVENTS.length;
    label = "Exercise complete. Review your doctrine and weak points.";
  }

  elements.progressFill.style.width = `${(completed / EVENTS.length) * 100}%`;
  elements.progressText.textContent = label;
}

function renderToolSummary() {
  elements.toolCounter.textContent = `${state.selectedTools.length} / ${MAX_TOOL_SELECTION} selected`;

  if (!state.selectedTools.length) {
    elements.toolSummary.innerHTML =
      '<div class="empty-state">No resilience tools selected yet. The game begins once you fund exactly two.</div>';
    return;
  }

  elements.toolSummary.innerHTML = state.selectedTools
    .map((toolId) => {
      const tool = TOOL_MAP.get(toolId);
      return `
        <article class="summary-card">
          <p class="tool-tag">${tool.tag}</p>
          <h4>${tool.title}</h4>
          <p>${tool.description}</p>
          <div class="effect-list">
            ${tool.effectSummary.map((item) => `<span class="effect-pill">${item}</span>`).join("")}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderDecisionLog() {
  if (!state.log.length) {
    elements.decisionLog.innerHTML = '<div class="empty-state">No decisions recorded yet.</div>';
    return;
  }

  elements.decisionLog.innerHTML = state.log
    .map(
      (entry) => `
        <article class="log-item">
          <span class="log-tag">${entry.tag}</span>
          <h4>${entry.title}</h4>
          <p>${entry.copy}</p>
        </article>
      `,
    )
    .join("");
}

function renderSourceList() {
  elements.sourceList.innerHTML = [
    ...SOURCE_ITEMS.map(
      (item) => `
        <article class="source-item">
          <h4>${item.title}</h4>
          <p>${item.detail}</p>
          <p class="source-meta">${item.pages}</p>
        </article>
      `,
    ),
    `
      <article class="source-item">
        <h4>Primary source</h4>
        <p>
          RenewableUK, <em>New threats and new tools: reinventing energy security for an era of instability</em>.
        </p>
        <p class="source-meta">
          <a class="panel-link" href="https://www.renewableuk.com/media/pqobbk3c/new-threats-and-new-tools-reinventing-energy-security-for-an-era-of-instability.pdf" target="_blank" rel="noreferrer">Open PDF</a>
        </p>
      </article>
    `,
  ].join("");
}

function renderStage() {
  if (state.screen === "prep") {
    renderPrepScreen();
    return;
  }

  if (state.screen === "decision") {
    renderDecisionScreen();
    return;
  }

  if (state.screen === "result") {
    renderResultScreen();
    return;
  }

  renderDebriefScreen();
}

function renderPrepScreen() {
  elements.phaseChip.textContent = "Preparation";
  elements.eventCounter.textContent = `0 / ${EVENTS.length} decisions`;
  elements.stageTitle.textContent = "Build your crisis posture";
  elements.stageLead.textContent =
    "The report offers six strategic tools. You only get the budget and institutional bandwidth to activate two before the winter shock sequence begins.";
  elements.signalRow.innerHTML = [
    "Whole-of-society resilience",
    "Strategic reserves",
    "Shared cyber reporting",
  ]
    .map((signal) => `<span class="signal-pill">${signal}</span>`)
    .join("");

  const cards = TOOLS.map((tool) => {
    const isSelected = state.selectedTools.includes(tool.id);
    const isDisabled = !isSelected && state.selectedTools.length >= MAX_TOOL_SELECTION;

    return `
      <button
        type="button"
        class="tool-card${isSelected ? " is-selected" : ""}${isDisabled ? " is-disabled" : ""}"
        data-action="toggle-tool"
        data-tool-id="${tool.id}"
        ${isDisabled ? 'aria-disabled="true"' : ""}
      >
        <p class="tool-tag">${tool.tag}</p>
        <h3 class="tool-title">${tool.title}</h3>
        <p class="tool-copy">${tool.description}</p>
        <div class="effect-list">
          ${tool.effectSummary.map((item) => `<span class="effect-pill">${item}</span>`).join("")}
        </div>
      </button>
    `;
  }).join("");

  const canStart = state.selectedTools.length === MAX_TOOL_SELECTION;

  elements.stageBody.innerHTML = `
    <div class="prep-grid">${cards}</div>
    <div class="prep-actions">
      <button class="primary-button" type="button" data-action="start-game" ${canStart ? "" : "disabled"}>
        Start winter exercise
      </button>
      <button class="ghost-button" type="button" data-action="reset-tools">
        Clear selection
      </button>
    </div>
    <p class="stage-note">
      The game is grounded in the report's six concluding recommendations. Tool bonuses then modify how your choices land inside each scenario.
    </p>
  `;
}

function renderDecisionScreen() {
  const event = EVENTS[state.currentEventIndex];
  elements.phaseChip.textContent = event.phase;
  elements.eventCounter.textContent = event.counterLabel;
  elements.stageTitle.textContent = event.title;
  elements.stageLead.textContent = event.lead;
  elements.signalRow.innerHTML = event.signals.map((signal) => `<span class="signal-pill">${signal}</span>`).join("");

  const choiceCards = event.choices
    .map((choice) => {
      const synergy = getSynergyText(choice);
      return `
        <button class="choice-card" type="button" data-action="choose-option" data-choice-id="${choice.id}">
          <span class="choice-tag">Decision option</span>
          <h3 class="choice-title">${choice.title}</h3>
          <p class="choice-copy">${choice.description}</p>
          <div class="choice-footer">
            ${synergy ? `<p class="choice-synergy">${synergy}</p>` : ""}
          </div>
        </button>
      `;
    })
    .join("");

  elements.stageBody.innerHTML = `
    <p class="stage-note">${event.prompt}</p>
    <div class="choice-grid">${choiceCards}</div>
    <p class="stage-note">${event.pageNote}</p>
  `;
}

function renderResultScreen() {
  const resolution = state.pendingResolution;
  const deltaChips = resolution.deltas
    .map(
      (delta) => `
        <span class="delta-chip ${delta.delta >= 0 ? "is-positive" : "is-negative"}">
          ${delta.delta >= 0 ? "+" : ""}${delta.delta} ${METRIC_META[delta.metric].shortLabel}
        </span>
      `,
    )
    .join("");

  const bonusHtml = resolution.notes.length
    ? `
      <div class="bonus-block">
        <p class="result-kicker">Tool interactions</p>
        <div class="bonus-stack">
          ${resolution.notes.map((note) => `<div class="bonus-item">${note}</div>`).join("")}
        </div>
      </div>
    `
    : "";

  elements.phaseChip.textContent = resolution.phase;
  elements.eventCounter.textContent = resolution.counterLabel;
  elements.stageTitle.textContent = resolution.eventTitle;
  elements.stageLead.textContent = resolution.choiceTitle;
  elements.signalRow.innerHTML = resolution.summaryTags
    .map((tag) => `<span class="signal-pill">${tag}</span>`)
    .join("");

  elements.stageBody.innerHTML = `
    <article class="result-card">
      <p class="result-kicker">Outcome</p>
      <h3 class="result-title">${resolution.choiceTitle}</h3>
      <div class="delta-row">${deltaChips}</div>
      <p class="result-copy">${resolution.result}</p>
      ${bonusHtml}
      <div class="result-actions">
        <button class="primary-button" type="button" data-action="continue">
          ${state.currentEventIndex === EVENTS.length - 1 ? "See debrief" : "Continue"}
        </button>
      </div>
    </article>
  `;
}

function renderDebriefScreen() {
  const totalScore = getTotalScore();
  const ending = getEnding(totalScore);
  const insights = buildInsights();
  const recommendations = buildRecommendations();
  const historyCards = state.history
    .map(
      (item) => `
        <article class="history-card">
          <p class="tool-tag">${item.phase}</p>
          <h4>${item.eventTitle}</h4>
          <p class="history-choice">${item.choiceTitle}</p>
          <p class="history-copy">${item.result}</p>
          <div class="summary-row">
            ${item.deltas
              .map(
                (delta) =>
                  `<span class="summary-pill">${delta.delta >= 0 ? "+" : ""}${delta.delta} ${METRIC_META[delta.metric].shortLabel}</span>`,
              )
              .join("")}
          </div>
        </article>
      `,
    )
    .join("");

  elements.phaseChip.textContent = "Debrief";
  elements.eventCounter.textContent = `6 / ${EVENTS.length} decisions`;
  elements.stageTitle.textContent = "Your winter doctrine";
  elements.stageLead.textContent =
    "This is not a pass-fail exercise. The report's own logic is that you can keep the system alive and still lose politically, financially, or strategically if the wrong mechanism carries too much of the load.";
  elements.signalRow.innerHTML = [
    `${Math.round(state.metrics.stability)} Stability`,
    `${Math.round(state.metrics.trust)} Trust`,
    `${Math.round(state.metrics.fiscal)} Fiscal`,
    `${Math.round(state.metrics.clarity)} Clarity`,
  ]
    .map((signal) => `<span class="signal-pill">${signal}</span>`)
    .join("");

  elements.stageBody.innerHTML = `
    <div class="debrief-grid">
      <article class="ending-card">
        <div class="ending-banner">
          <div>
            <p class="result-kicker">Final assessment</p>
            <h3 class="ending-title">${ending.title}</h3>
            <p class="score-summary">${ending.copy}</p>
          </div>
          <div class="ending-score">
            <p class="ending-score-label">Aggregate resilience score</p>
            <p class="ending-score-value">${totalScore}</p>
          </div>
        </div>

        <div class="scoreboard">
          ${Object.entries(state.metrics)
            .map(
              ([key, value]) => `
                <div class="score-card">
                  <span class="mini-label">${METRIC_META[key].label}</span>
                  <strong>${Math.round(value)}</strong>
                </div>
              `,
            )
            .join("")}
        </div>
      </article>

      <div>
        <p class="result-kicker">Strategic readout</p>
        <div class="insight-grid">
          ${insights
            .map(
              (item) => `
                <article class="insight-card">
                  <h4 class="insight-title">${item.title}</h4>
                  <p class="insight-copy">${item.copy}</p>
                </article>
              `,
            )
            .join("")}
        </div>
      </div>

      <div>
        <p class="result-kicker">Report-informed next steps</p>
        <div class="recommendation-grid">
          ${recommendations
            .map(
              (item) => `
                <article class="recommendation-card">
                  <h4 class="recommendation-title">${item.title}</h4>
                  <p class="recommendation-copy">${item.copy}</p>
                </article>
              `,
            )
            .join("")}
        </div>
      </div>

      <div>
        <p class="result-kicker">Decision history</p>
        <div class="history-grid">${historyCards}</div>
      </div>

      <div class="debrief-actions">
        <button class="primary-button" type="button" data-action="restart-game">Play again</button>
      </div>
    </div>
  `;
}

function getSynergyText(choice) {
  const matchedTools = (choice.bonuses || [])
    .filter((bonus) => state.selectedTools.includes(bonus.tool))
    .map((bonus) => TOOL_MAP.get(bonus.tool).title);

  if (!matchedTools.length) {
    return "";
  }

  if (matchedTools.length === 1) {
    return `Synergy live: ${matchedTools[0]}`;
  }

  return `Synergy live: ${matchedTools.join(" + ")}`;
}

function handleStageClick(event) {
  const target = event.target.closest("[data-action]");

  if (!target) return;

  const action = target.getAttribute("data-action");

  if (target.getAttribute("aria-disabled") === "true") {
    return;
  }

  if (action === "toggle-tool") {
    toggleTool(target.getAttribute("data-tool-id"));
    return;
  }

  if (action === "reset-tools") {
    state.selectedTools = [];
    render();
    return;
  }

  if (action === "start-game") {
    startGame();
    return;
  }

  if (action === "choose-option") {
    resolveChoice(target.getAttribute("data-choice-id"));
    return;
  }

  if (action === "continue") {
    continueFromResult();
    return;
  }

  if (action === "restart-game") {
    resetGame();
    return;
  }
}

function toggleTool(toolId) {
  if (!toolId) return;

  if (state.selectedTools.includes(toolId)) {
    state.selectedTools = state.selectedTools.filter((id) => id !== toolId);
    render();
    return;
  }

  if (state.selectedTools.length >= MAX_TOOL_SELECTION) {
    return;
  }

  state.selectedTools = [...state.selectedTools, toolId];
  render();
}

function startGame() {
  if (state.selectedTools.length !== MAX_TOOL_SELECTION) {
    return;
  }

  state.metrics = cloneMetrics(BASE_METRICS);
  state.currentEventIndex = 0;
  state.pendingResolution = null;
  state.screen = "decision";
  state.history = [];
  state.patterns = {
    supply: 0,
    cost: 0,
    demand: 0,
    public: 0,
    coordination: 0,
    cyber: 0,
    storage: 0,
    attribution: 0,
  };

  state.log = [
    {
      tag: "Prepared",
      title: "Winter posture set",
      copy: state.selectedTools.map((toolId) => TOOL_MAP.get(toolId).title).join(" and "),
    },
  ];

  state.selectedTools.forEach((toolId) => {
    applyEffects(TOOL_MAP.get(toolId).setupEffects);
  });

  render();
}

function resolveChoice(choiceId) {
  const event = EVENTS[state.currentEventIndex];
  const choice = event.choices.find((item) => item.id === choiceId);

  if (!choice) return;

  const cumulativeEffects = { stability: 0, trust: 0, fiscal: 0, clarity: 0 };
  const notes = [];

  mergeEffects(cumulativeEffects, choice.effects);

  (choice.bonuses || []).forEach((bonus) => {
    if (!state.selectedTools.includes(bonus.tool)) {
      return;
    }

    mergeEffects(cumulativeEffects, bonus.effects);
    notes.push(bonus.note);
  });

  const deltas = applyEffects(cumulativeEffects);
  updatePatterns(choice.tags);

  const resolution = {
    phase: event.phase,
    counterLabel: event.counterLabel,
    eventTitle: event.title,
    choiceTitle: choice.title,
    result: choice.result,
    summaryTags: event.signals,
    deltas,
    notes,
  };

  state.history.push({
    phase: event.phase,
    eventTitle: event.title,
    choiceTitle: choice.title,
    result: choice.result,
    deltas,
  });

  state.log.unshift({
    tag: event.phase,
    title: choice.title,
    copy: choice.result,
  });

  state.pendingResolution = resolution;
  state.screen = "result";
  render();
}

function continueFromResult() {
  if (state.currentEventIndex === EVENTS.length - 1) {
    state.screen = "debrief";
    state.pendingResolution = null;
    render();
    return;
  }

  state.currentEventIndex += 1;
  state.pendingResolution = null;
  state.screen = "decision";
  render();
}

function resetGame() {
  const fresh = createInitialState();
  state.screen = fresh.screen;
  state.selectedTools = fresh.selectedTools;
  state.metrics = fresh.metrics;
  state.currentEventIndex = fresh.currentEventIndex;
  state.pendingResolution = fresh.pendingResolution;
  state.log = fresh.log;
  state.history = fresh.history;
  state.patterns = fresh.patterns;
  render();
}

function mergeEffects(target, source) {
  Object.entries(source || {}).forEach(([metric, delta]) => {
    target[metric] = (target[metric] || 0) + delta;
  });
}

function applyEffects(effects) {
  const deltas = [];

  Object.keys(METRIC_META).forEach((metric) => {
    const delta = Number(effects[metric] || 0);

    if (!delta) return;

    state.metrics[metric] = clamp(state.metrics[metric] + delta, 0, 100);
    deltas.push({ metric, delta });
  });

  return deltas;
}

function updatePatterns(tags) {
  (tags || []).forEach((tag) => {
    state.patterns[tag] = (state.patterns[tag] || 0) + 1;
  });
}

function getTotalScore() {
  return Math.round(
    Object.values(state.metrics).reduce((total, value) => total + value, 0),
  );
}

function getEnding(totalScore) {
  if (totalScore >= 300) {
    return {
      title: "Resilient transition",
      copy:
        "You kept the system stable without letting gas prices do all the work. This is closest to the report's ideal: combine reserves, flexibility, coordination, and clearer threat visibility so coercive leverage falls over time.",
    };
  }

  if (totalScore >= 240) {
    return {
      title: "Managed crisis",
      copy:
        "You avoided a breakdown, but at least one flank stayed exposed. The system survived because you mixed tools, not because any single doctrine solved the whole problem.",
    };
  }

  if (totalScore >= 180) {
    return {
      title: "Expensive stability",
      copy:
        "You kept the lights on, but mainly by spending money or tolerating ambiguity. The report explicitly warns that this kind of survival can still weaken trust, industry, and national resilience.",
    };
  }

  return {
    title: "Fragile victory",
    copy:
      "The system technically survives, but your response leaves the UK more vulnerable to the next grey-zone shock. This is the report's nightmare outcome: continuity purchased without reducing coercive leverage.",
  };
}

function buildInsights() {
  const insights = [];

  if (state.patterns.demand + state.patterns.public >= 3) {
    insights.push({
      title: "You treated citizens as part of resilience",
      copy:
        "That aligns with one of the report's clearest arguments: energy security is not just generation and pipes, but also public behaviour, expectations, and psychological readiness.",
    });
  } else {
    insights.push({
      title: "Demand played too small a role",
      copy:
        "Your doctrine leaned more on buying supply than shaping demand. The report argues that this is precisely why price shocks remain so politically dangerous.",
    });
  }

  if (state.patterns.cyber + state.patterns.coordination >= 3) {
    insights.push({
      title: "You acted as if distributed cyber risk can cascade",
      copy:
        "That matches the report's warning that decentralised renewables are physically resilient but still require shared monitoring, escalation, and reporting discipline.",
    });
  } else {
    insights.push({
      title: "You trusted local containment too much",
      copy:
        "The report is sceptical of leaving cyber incidents at working level. Without shared channels, operators learn less and boards stay under-informed.",
    });
  }

  if (state.patterns.supply + state.patterns.cost >= 3) {
    insights.push({
      title: "Gas remained your default shock absorber",
      copy:
        "That kept the system smoother in the short term, but it mirrors the report's core critique: the UK too often pays its way through crises rather than reducing its exposure to them.",
    });
  } else {
    insights.push({
      title: "You tried to reduce coercive leverage",
      copy:
        "Your decisions repeatedly shifted pressure away from panic-priced gas and toward storage, flexibility, and clearer coordination, which is very close to the report's strategic conclusion.",
    });
  }

  return insights.slice(0, 3);
}

function buildRecommendations() {
  const sortedMetrics = Object.entries(state.metrics)
    .sort(([, a], [, b]) => a - b)
    .map(([metric]) => metric);

  const recommendations = [];

  sortedMetrics.slice(0, 2).forEach((metric) => {
    if (metric === "stability") {
      recommendations.push({
        title: "Increase the system's buffer, not just its bravado",
        copy:
          "The report points toward gas storage, long-duration electricity storage, and hardware stockpiles as the practical way to create time during the next shock.",
      });
    }

    if (metric === "trust") {
      recommendations.push({
        title: "Normalise public participation before the next crisis",
        copy:
          "Whole-of-society resilience only works if people have already practiced it. The report's flexibility and communication recommendations are the fix here.",
      });
    }

    if (metric === "fiscal") {
      recommendations.push({
        title: "Stop asking the Treasury to be the entire resilience model",
        copy:
          "The report's strongest cost argument is that resilience improves when flexibility and storage reduce reliance on extreme gas purchases and blunt subsidies.",
      });
    }

    if (metric === "clarity") {
      recommendations.push({
        title: "See more of the system sooner",
        copy:
          "Bring renewable operators further into common security channels and lower reporting thresholds so cyber ambiguity does not outrun decision-making.",
      });
    }
  });

  if (!recommendations.some((item) => item.title.includes("North Sea"))) {
    recommendations.push({
      title: "Turn regional goodwill into North Sea operating depth",
      copy:
        "The report sees undersea infrastructure as a shared strategic frontier. Stronger patrols, data sharing, and allied coordination reduce both delay and deniability.",
    });
  }

  return recommendations.slice(0, 3);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
