import { useEffect, useRef } from 'react';

function TypingAnimation() {
  const titleRef = useRef(null);

  useEffect(() => {
    const titleElement = titleRef.current;
    const titleText = 'TripIt. Simplify your Itinerary Planning';
    let currentIndex = 0;
    let animationId;

    const typeCharacter = () => {
      if (currentIndex < titleText.length) {
        titleElement.textContent += titleText.charAt(currentIndex);
        currentIndex++;
        animationId = requestAnimationFrame(typeCharacter);
      }
    };

    if (titleElement) {
      animationId = requestAnimationFrame(typeCharacter);
    }

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className='about-title' ref={titleRef}></div>
  );
}

export default TypingAnimation;