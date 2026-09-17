const counters = document.querySelectorAll(".counter");
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      function formatCounterValue(value, target) {
        if (target >= 1000000) {
          if (value >= 1000000) return "10⁶+";
          if (value >= 1000) {
            return Math.floor(value / 1000).toLocaleString() + "K";
          }
        }

        return Math.floor(value).toLocaleString();
      }

      function animateCounter(counter) {
        if (counter.dataset.counted === "true") return;

        counter.dataset.counted = "true";

        const target = Number(counter.dataset.target);
        const finalText = counter.dataset.final;
        const duration = target >= 1000000 ? 1700 : 1350;

        if (reduceMotion) {
          counter.textContent = finalText;
          return;
        }

        const startTime = performance.now();

        function frame(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);

          /* easeOutCubic */
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = target * eased;

          counter.textContent = formatCounterValue(value, target);

          if (progress < 1) {
            requestAnimationFrame(frame);
          } else {
            counter.textContent = finalText;
          }
        }

        requestAnimationFrame(frame);
      }

      if ("IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver(
          function (entries, observer) {
            entries.forEach(function (entry) {
              if (!entry.isIntersecting) return;

              entry.target
                .querySelectorAll(".counter")
                .forEach(animateCounter);

              observer.unobserve(entry.target);
            });
          },
          {
            threshold: 0.35
          }
        );

        const proofLine = document.querySelector(".proof-line");

        if (proofLine) {
          counterObserver.observe(proofLine);
        }
      } else {
        counters.forEach(animateCounter);
      }
