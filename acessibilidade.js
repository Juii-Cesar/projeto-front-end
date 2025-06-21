  $(document).ready(function () {
      const $accessibilityBtn = $("#accessibilityBtn");
      const $accessibilityPanel = $("#accessibilityPanel");
      const $closePanel = $("#closePanel");
      const $fontSlider = $("#fontSlider");
      const $fontSizeDisplay = $("#fontSizeDisplay");
      const $resetButton = $("#resetFont");
      const $body = $("body");

      // Toggle painel
      $accessibilityBtn.on("click", function () {
        togglePanel();
      });

      // Fechar painel
      $closePanel.on("click", function () {
        closeAccessibilityPanel();
      });

      // Slider de fonte
      $fontSlider.on("input", function () {
        updateFontSize($(this).val());
      });

      // Reset da fonte
      $resetButton.on("click", function () {
        resetFontSize();
      });

      // Fechar ao clicar fora
      $(document).on("click", function (e) {
        if (
          !$(e.target).closest($accessibilityPanel).length &&
          !$(e.target).closest($accessibilityBtn).length
        ) {
          closeAccessibilityPanel();
        }
      });

      // Atalho Alt + A
      $(document).on("keydown", function (e) {
        if (e.altKey && e.key.toLowerCase() === "a") {
          e.preventDefault();
          togglePanel();
        }
      });

      // Funções
      function togglePanel() {
        const isActive = $accessibilityPanel.hasClass("active");
        if (isActive) {
          closeAccessibilityPanel();
        } else {
          openAccessibilityPanel();
        }
      }

      function openAccessibilityPanel() {
        $accessibilityPanel.addClass("active").attr("aria-hidden", "false");
        $accessibilityBtn.attr("aria-expanded", "true");
        $accessibilityBtn.removeClass("pulse");

        setTimeout(function () {
          $fontSlider.focus();
        }, 300);
      }

      function closeAccessibilityPanel() {
        $accessibilityPanel.removeClass("active").attr("aria-hidden", "true");
        $accessibilityBtn.attr("aria-expanded", "false");
      }

      function updateFontSize(value) {
        const fontSize = parseInt(value);
        const textElements = $("p, h1, h2, h3, h4, h5, h6, a, span, li, label, button");

        textElements.each(function () {
          $(this).css("font-size", fontSize + "%");
        });

        $fontSizeDisplay.text(fontSize + "%");
        localStorage.setItem("accessibilityFontSize", fontSize);

  // Feedback visual
        $fontSizeDisplay.css("transform", "scale(1.1)");
        setTimeout(() => {
          $fontSizeDisplay.css("transform", "scale(1)");
        }, 200);
      }

      function resetFontSize() {
        const defaultSize = 100;
        $fontSlider.val(defaultSize);
        updateFontSize(defaultSize);

        // Animação de feedback
        $resetButton.css("transform", "scale(0.95)");
        setTimeout(() => {
          $resetButton.css("transform", "scale(1)");
        }, 150);
      }

      function loadSavedSettings() {
        const savedFontSize = localStorage.getItem("accessibilityFontSize");
        if (savedFontSize) {
          $fontSlider.val(savedFontSize);
          updateFontSize(savedFontSize);
        }

        if (!localStorage.getItem("accessibilityIntroShown")) {
          setTimeout(() => {
            $accessibilityBtn.addClass("pulse");
            localStorage.setItem("accessibilityIntroShown", "true");
          }, 2000);
        }
      }

      // Inicializar
      loadSavedSettings();
    });