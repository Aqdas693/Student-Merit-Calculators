/**
 * ==========================================================================
 * Pakistani Student Calculator Tools - Semester CGPA Calculator
 * Higher Education Commission (HEC) / Pakistani Universities
 * ==========================================================================
 * 
 * OFFICIAL HEC CGPA FORMULA:
 * --------------------------------------------------------------------------
 * The standard credit-hour-weighted Cumulative Grade Point Average formula:
 * 
 *   Quality Points (QP) = Semester GPA × Semester Credit Hours
 *   Total Quality Points = ∑ (QP_i)
 *   Total Credit Hours = ∑ (Credit Hours_i)
 *   CGPA = Total Quality Points ÷ Total Credit Hours
 * 
 * Inputs:
 *   - Semester GPA: Number between 0.00 and 4.00 (Standard 4.0 scale)
 *   - Credit Hours: Positive integer >= 1
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cgpa-form');
  const semestersContainer = document.getElementById('semesters-container');
  const addSemesterBtn = document.getElementById('add-semester-btn');
  const resetBtn = document.getElementById('reset-btn');
  const resultBox = document.getElementById('result-box');
  const cgpaResult = document.getElementById('cgpa-result');
  const totalCreditsDisplay = document.getElementById('total-credits');
  const totalQpDisplay = document.getElementById('total-qp');
  const semestersCountDisplay = document.getElementById('semesters-count');
  const breakdownDetails = document.getElementById('semester-breakdown-details');

  // Helper to set error on an input
  function setInputError(input, message) {
    input.classList.add('is-invalid');
    const err = input.parentElement.querySelector('.error-text');
    if (err) {
      err.textContent = message;
      err.classList.add('is-visible');
    }
  }

  // Helper to clear error from an input
  function clearInputError(input) {
    input.classList.remove('is-invalid');
    const err = input.parentElement.querySelector('.error-text');
    if (err) {
      err.textContent = '';
      err.classList.remove('is-visible');
    }
  }

  // Clear all errors across all semester cards
  function clearAllErrors() {
    const inputs = semestersContainer.querySelectorAll('.form-input');
    inputs.forEach(inp => clearInputError(inp));
  }

  // Renumber rows and sync attributes/accessibility
  function renumberRows() {
    const cards = semestersContainer.querySelectorAll('.semester-card');
    const total = cards.length;

    cards.forEach((card, index) => {
      const semNum = index + 1;
      card.dataset.semesterIndex = semNum;

      // Title
      const titleSpan = card.querySelector('.semester-title-text');
      if (titleSpan) titleSpan.textContent = `Semester ${semNum}`;

      // Remove button
      const removeBtn = card.querySelector('.btn-remove');
      if (removeBtn) {
        removeBtn.setAttribute('aria-label', `Remove Semester ${semNum}`);
        if (total <= 1) {
          removeBtn.disabled = true;
          removeBtn.setAttribute('aria-disabled', 'true');
          removeBtn.title = 'At least one semester is required';
        } else {
          removeBtn.disabled = false;
          removeBtn.removeAttribute('aria-disabled');
          removeBtn.removeAttribute('title');
        }
      }

      // GPA input & label
      const gpaLabel = card.querySelector('.label-gpa');
      const gpaInput = card.querySelector('.sem-gpa');
      const gpaErr = card.querySelector('.err-gpa');
      if (gpaLabel) gpaLabel.setAttribute('for', `sem-gpa-${semNum}`);
      if (gpaInput) {
        gpaInput.id = `sem-gpa-${semNum}`;
        gpaInput.name = `sem_gpa_${semNum}`;
        gpaInput.setAttribute('aria-describedby', `err-gpa-${semNum}`);
      }
      if (gpaErr) gpaErr.id = `err-gpa-${semNum}`;

      // Credits input & label
      const crLabel = card.querySelector('.label-credits');
      const crInput = card.querySelector('.sem-credits');
      const crErr = card.querySelector('.err-credits');
      if (crLabel) crLabel.setAttribute('for', `sem-credits-${semNum}`);
      if (crInput) {
        crInput.id = `sem-credits-${semNum}`;
        crInput.name = `sem_credits_${semNum}`;
        crInput.setAttribute('aria-describedby', `err-credits-${semNum}`);
      }
      if (crErr) crErr.id = `err-credits-${semNum}`;
    });
  }

  // Create a single semester card element
  function createSemesterCard(semNum, defaultGpa = '', defaultCredits = '') {
    const card = document.createElement('div');
    card.className = 'semester-card';
    card.dataset.semesterIndex = semNum;
    card.innerHTML = `
      <div class="semester-card-header">
        <span class="semester-card-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          <span class="semester-title-text">Semester ${semNum}</span>
        </span>
        <button type="button" class="btn-remove" aria-label="Remove Semester ${semNum}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          Remove
        </button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="sem-gpa-${semNum}" class="form-label label-gpa">Semester GPA (0.00 – 4.00) <span class="required" aria-hidden="true">*</span></label>
          <input type="number" id="sem-gpa-${semNum}" name="sem_gpa_${semNum}" class="form-input sem-gpa" step="0.01" min="0" max="4.00" placeholder="e.g. 3.50" value="${defaultGpa}" required aria-describedby="err-gpa-${semNum}">
          <span class="error-text err-gpa" id="err-gpa-${semNum}" role="alert"></span>
        </div>
        <div class="form-group">
          <label for="sem-credits-${semNum}" class="form-label label-credits">Credit Hours (e.g. 15–21) <span class="required" aria-hidden="true">*</span></label>
          <input type="number" id="sem-credits-${semNum}" name="sem_credits_${semNum}" class="form-input sem-credits" step="1" min="1" placeholder="e.g. 18" value="${defaultCredits}" required aria-describedby="err-credits-${semNum}">
          <span class="error-text err-credits" id="err-credits-${semNum}" role="alert"></span>
        </div>
      </div>
    `;

    // Input event handlers
    const gpaInput = card.querySelector('.sem-gpa');
    const crInput = card.querySelector('.sem-credits');
    const removeBtn = card.querySelector('.btn-remove');

    [gpaInput, crInput].forEach(inp => {
      inp.addEventListener('input', () => {
        clearInputError(inp);
        if (resultBox.classList.contains('is-visible')) {
          calculateCgpa(false);
        }
      });
    });

    removeBtn.addEventListener('click', () => {
      removeSemester(card);
    });

    return card;
  }

  // Remove semester card
  function removeSemester(card) {
    const totalCards = semestersContainer.querySelectorAll('.semester-card').length;
    if (totalCards <= 1) return;

    card.remove();
    renumberRows();

    if (resultBox.classList.contains('is-visible')) {
      calculateCgpa(false);
    }
  }

  // Add new semester card
  function addSemester() {
    const currentCount = semestersContainer.querySelectorAll('.semester-card').length;
    const newCard = createSemesterCard(currentCount + 1);
    semestersContainer.appendChild(newCard);
    renumberRows();

    const gpaInput = newCard.querySelector('.sem-gpa');
    if (gpaInput) gpaInput.focus();

    if (resultBox.classList.contains('is-visible')) {
      calculateCgpa(false);
    }
  }

  // Validate single semester card
  function validateRow(card) {
    let isValid = true;
    const semNum = card.dataset.semesterIndex || '1';
    const gpaInput = card.querySelector('.sem-gpa');
    const crInput = card.querySelector('.sem-credits');

    clearInputError(gpaInput);
    clearInputError(crInput);

    // Validate GPA
    const gpaVal = gpaInput.value.trim();
    if (gpaVal === '') {
      setInputError(gpaInput, `Please enter GPA for Semester ${semNum}.`);
      isValid = false;
    } else {
      const gpaNum = Number(gpaVal);
      if (isNaN(gpaNum)) {
        setInputError(gpaInput, 'Please enter a valid GPA number.');
        isValid = false;
      } else if (gpaNum < 0 || gpaNum > 4.0) {
        setInputError(gpaInput, 'GPA must be between 0.00 and 4.00.');
        isValid = false;
      }
    }

    // Validate Credit Hours
    const crVal = crInput.value.trim();
    if (crVal === '') {
      setInputError(crInput, `Please enter credit hours for Semester ${semNum}.`);
      isValid = false;
    } else {
      const crNum = Number(crVal);
      if (isNaN(crNum) || !Number.isInteger(crNum)) {
        setInputError(crInput, 'Credit hours must be a positive whole number.');
        isValid = false;
      } else if (crNum < 1) {
        setInputError(crInput, 'Credit hours must be at least 1.');
        isValid = false;
      }
    }

    return isValid;
  }

  // Perform calculation
  function calculateCgpa(shouldScroll = true) {
    const cards = Array.from(semestersContainer.querySelectorAll('.semester-card'));
    let allValid = true;
    let firstInvalidInput = null;

    cards.forEach(card => {
      const valid = validateRow(card);
      if (!valid) {
        allValid = false;
        if (!firstInvalidInput) {
          firstInvalidInput = card.querySelector('.form-input.is-invalid');
        }
      }
    });

    if (!allValid) {
      if (shouldScroll) {
        resultBox.classList.remove('is-visible');
        if (firstInvalidInput) firstInvalidInput.focus();
      }
      return;
    }

    // Accumulate sums
    let totalQualityPoints = 0;
    let totalCreditHours = 0;
    const breakdownList = [];

    cards.forEach((card, index) => {
      const gpa = Number(card.querySelector('.sem-gpa').value.trim());
      const credits = Number(card.querySelector('.sem-credits').value.trim());
      const qp = gpa * credits;

      totalQualityPoints += qp;
      totalCreditHours += credits;

      breakdownList.push({
        semester: index + 1,
        gpa: gpa,
        credits: credits,
        qp: qp
      });
    });

    if (totalCreditHours <= 0) {
      return;
    }

    const overallCgpa = totalQualityPoints / totalCreditHours;

    // Display formatted results
    cgpaResult.textContent = overallCgpa.toFixed(2);
    totalCreditsDisplay.textContent = totalCreditHours.toString();
    totalQpDisplay.textContent = totalQualityPoints.toFixed(2);
    semestersCountDisplay.textContent = `${cards.length} ${cards.length === 1 ? 'Semester' : 'Semesters'}`;

    // Render detailed semester table breakdown
    if (breakdownDetails) {
      let breakdownHtml = `
        <div style="overflow-x: auto; margin-top: var(--space-md);">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; background: #ffffff; border-radius: var(--radius-sm); border: 1px solid rgba(13, 92, 58, 0.2);">
            <thead>
              <tr style="background: var(--color-bg-body); border-bottom: 1px solid rgba(13, 92, 58, 0.2); text-align: left;">
                <th style="padding: 8px 12px; font-weight: 600; color: var(--color-text-main);">Semester</th>
                <th style="padding: 8px 12px; font-weight: 600; color: var(--color-text-main);">GPA</th>
                <th style="padding: 8px 12px; font-weight: 600; color: var(--color-text-main);">Credit Hours</th>
                <th style="padding: 8px 12px; font-weight: 600; color: var(--color-text-main);">Quality Points</th>
              </tr>
            </thead>
            <tbody>
      `;

      breakdownList.forEach(item => {
        breakdownHtml += `
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 8px 12px; font-weight: 600; color: var(--color-primary);">Semester ${item.semester}</td>
            <td style="padding: 8px 12px; color: var(--color-text-main);">${item.gpa.toFixed(2)}</td>
            <td style="padding: 8px 12px; color: var(--color-text-main);">${item.credits}</td>
            <td style="padding: 8px 12px; color: var(--color-text-main);">${item.qp.toFixed(2)}</td>
          </tr>
        `;
      });

      breakdownHtml += `
            </tbody>
          </table>
        </div>
      `;
      breakdownDetails.innerHTML = breakdownHtml;
    }

    // Reveal result box
    resultBox.classList.add('is-visible');

    if (shouldScroll) {
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Optional Google Analytics event
    if (typeof gtag === 'function') {
      gtag('event', 'calculate_cgpa', {
        event_category: 'calculator',
        semesters_count: cards.length,
        final_cgpa: Number(overallCgpa.toFixed(2))
      });
    }
  }

  // Reset calculator to initial state
  function resetCalculator() {
    semestersContainer.innerHTML = '';
    semestersContainer.appendChild(createSemesterCard(1));
    semestersContainer.appendChild(createSemesterCard(2));
    renumberRows();
    clearAllErrors();
    resultBox.classList.remove('is-visible');
    if (breakdownDetails) breakdownDetails.innerHTML = '';

    const firstInput = semestersContainer.querySelector('#sem-gpa-1');
    if (firstInput) firstInput.focus();
  }

  // Event Listeners
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateCgpa(true);
  });

  addSemesterBtn.addEventListener('click', () => {
    addSemester();
  });

  resetBtn.addEventListener('click', () => {
    resetCalculator();
  });

  // Initial setup: render 2 default rows
  resetCalculator();
});
