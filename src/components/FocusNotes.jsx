import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


const SLIDES =
[
  {headline: "Make today count.",text: "A little focus goes a long way.",cardLabel: "NEXT UP",cardTitle: "Design landing page",progress: 62},
  {headline: "Small steps, big progress.",text: "Keep your priorities in view.",cardLabel: "IN PROGRESS",cardTitle: "Fix navigation",progress: 87},
  {headline: "Celebrate the wins.",text: "Every completed task moves you forward.",cardLabel: "COMPLETED",cardTitle: "Onboarding copy",progress: 100}
];

function FocusNotes()
{
  // Which slide is showing: 0, 1 or 2.
  const [activeIndex, setActiveIndex] = useState(0);

  const slide = SLIDES[activeIndex];

  // Circular navigation: after the last slide comes the first, and before the first comes the last.
  const goNext = () =>
  {
    setActiveIndex((activeIndex + 1) % SLIDES.length);
  };

  const goPrevious = () =>
  {
    setActiveIndex((activeIndex - 1 + SLIDES.length) % SLIDES.length);
  };

  const FocusNotesJsx =
  <section aria-label="Focus notes" aria-live="polite">
    <p>FOCUS NOTES · 0{activeIndex + 1} / 0{SLIDES.length}</p>
    <h2>{slide.headline}</h2>
    <p>{slide.text}</p>

    {/* Floating card */}
    <div>
      <p>{slide.cardLabel}</p>
      <p>{slide.cardTitle}</p>
      <p>{slide.progress}%</p>
    </div>

    {/* Previous and next buttons */}
    <button type="button" aria-label="Previous slide" onClick={goPrevious}><ChevronLeft/></button>
    <button type="button" aria-label="Next slide" onClick={goNext}><ChevronRight/></button>

    {/* Indicators: click one to jump straight to that slide */}
    <div>
      {
        SLIDES.map
        (
          (item, index) =>
          (
            <button key={item.headline} type="button" aria-label={"Go to slide " + (index + 1)} aria-current={index === activeIndex} style={{fontWeight: index === activeIndex ? "bold" : "normal"}} onClick={() => setActiveIndex(index)}>{index === activeIndex ? "●" : "○"}</button>
          )
        )
      }
    </div>
  </section>

  return FocusNotesJsx
}

export default FocusNotes;