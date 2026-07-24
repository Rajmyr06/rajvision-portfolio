import { useState } from "react";
import "./styles/WhatIDo.css";
import { config } from "../config";

const WhatIDo = () => {
  const [activePanel, setActivePanel] = useState(0);
  const panels = [config.skills.develop, config.skills.design];

  return (
    <section className="whatIDO" aria-labelledby="what-i-do-title">
      <div className="what-box what-heading">
        <h2 className="title" id="what-i-do-title">
          W<span className="hat-h2">HAT</span>
          <span className="what-heading-line">
            &nbsp;I<span className="do-h2"> DO</span>
          </span>
        </h2>
      </div>

      <div className="what-box what-panels">
        <div className="what-box-in">
          {panels.map((panel, index) => {
            const isActive = activePanel === index;

            return (
              <button
                className={`what-content ${
                  isActive ? "what-content-active" : "what-content-collapsed"
                }`}
                key={panel.title}
                type="button"
                aria-expanded={isActive}
                onClick={() => setActivePanel(index)}
                onFocus={() => setActivePanel(index)}
                onMouseEnter={() => setActivePanel(index)}
              >
                <span className="what-corner" aria-hidden="true"></span>
                <span className="what-content-in">
                  <span className="what-panel-number">0{index + 1}</span>
                  <span className="what-panel-title">{panel.title}</span>
                  <span className="what-panel-summary">
                    {panel.description}
                  </span>

                  <span className="what-panel-detail">
                    <span className="what-panel-copy">{panel.details}</span>
                    <span className="what-panel-label">Skillset & tools</span>
                    <span className="what-content-flex">
                      {panel.tools.map((tool) => (
                        <span className="what-tags" key={tool}>
                          {tool}
                        </span>
                      ))}
                    </span>
                  </span>

                  <span className="what-arrow" aria-hidden="true"></span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
