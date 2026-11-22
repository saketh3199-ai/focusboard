import { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

// The three slides, copied from the Figma frames.
// TODO: slide 3 text is cut off in the recording, replace it with the exact Figma text.
const SLIDES =
[
  {headline: "Make today count.",text: "A little focus goes a long way.",cardLabel: "NEXT UP",cardTitle: "Design landing page",progress: 62},
  {headline: "Small steps, big progress.",text: "Keep your priorities in view.",cardLabel: "IN PROGRESS",cardTitle: "Fix navigation",progress: 87},
  {headline: "Celebrate the wins.",text: "Every completed task moves you forward.",cardLabel: "COMPLETED",cardTitle: "Onboarding copy",progress: 100}
];

function FocusNotes()
{
  const [activeIndex, setActiveIndex] = useState(0);

  const slide = SLIDES[activeIndex];

  const goNext = () =>
  {
    setActiveIndex((activeIndex + 1) % SLIDES.length);
  };

  const goPrevious = () =>
  {
    setActiveIndex((activeIndex - 1 + SLIDES.length) % SLIDES.length);
  };

  const FocusNotesJsx =
  <section className="focus-notes" aria-label="Focus notes" aria-live="polite">
    {/* Left side: text and indicators */}
    <div className="focus-notes__content">
      <p className="focus-notes__label">FOCUS NOTES · 0{activeIndex + 1} / 0{SLIDES.length}</p>
      <h2 className="focus-notes__headline">{slide.headline}</h2>
      <p className="focus-notes__text">{slide.text}</p>

      <div className="focus-notes__indicators">
        {
          SLIDES.map
          (
            (item, index) =>
            (
              <button key={item.headline} type="button" className={index === activeIndex ? "focus-notes__indicator focus-notes__indicator--active" : "focus-notes__indicator"} aria-label={"Go to slide " + (index + 1)} aria-current={index === activeIndex} onClick={() => setActiveIndex(index)}></button>
            )
          )
        }
      </div>
    </div>

    {/* Middle: floating card */}
    <div className="focus-notes__card">
      <span className="focus-notes__card-check"><Check aria-hidden="true"/></span>
      <div className="focus-notes__card-body">
        <p className="focus-notes__card-label">{slide.cardLabel}</p>
        <p className="focus-notes__card-title">{slide.cardTitle}</p>
        <div className="focus-notes__progress-row">
          <div className="focus-notes__progress"><span style={{width: slide.progress + "%"}}></span></div>
          <span className="focus-notes__percent">{slide.progress}%</span>
        </div>
      </div>
    </div>

    {/* Right: previous and next buttons */}
    <div className="focus-notes__controls">
      <button type="button" className="focus-notes__button" aria-label="Previous slide" onClick={goPrevious}><ChevronLeft/></button>
      <button type="button" className="focus-notes__button focus-notes__button--next" aria-label="Next slide" onClick={goNext}><ChevronRight/></button>
    </div>
  </section>

  return FocusNotesJsx
}

export default FocusNotes;