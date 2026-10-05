/**
 * ==========================================================================
 * Pakistani Student Calculator Tools - UAF GPA & CGPA Calculator
 * University of Agriculture Faisalabad (Semester & Cumulative GPA)
 * ==========================================================================
 * 
 * OFFICIAL UAF QUALITY POINT LOOKUP TABLE:
 * --------------------------------------------------------------------------
 * UAF calculates GPA based on a discrete Quality Point Schedule per course:
 *   GPA = (Sum of Quality Points across all courses) ÷ (Total Credit Hours)
 * 
 * Quality Points are assigned strictly via official lookup based on credit
 * hours (1 to 5) and obtained marks. Marks below the minimum threshold
 * result in 0.00 Quality Points (F / Fail grade).
 * ==========================================================================
 */

const UAF_QP_SCHEDULE = {
  1: {
    maxMarks: 20,
    minPass: 8,
    table: [
      { minMark: 8, maxMark: 8, qualityPoints: 1.00 },
      { minMark: 9, maxMark: 9, qualityPoints: 1.50 },
      { minMark: 10, maxMark: 10, qualityPoints: 2.00 },
      { minMark: 11, maxMark: 11, qualityPoints: 2.33 },
      { minMark: 12, maxMark: 12, qualityPoints: 2.67 },
      { minMark: 13, maxMark: 13, qualityPoints: 3.00 },
      { minMark: 14, maxMark: 14, qualityPoints: 3.33 },
      { minMark: 15, maxMark: 15, qualityPoints: 3.67 },
      { minMark: 16, maxMark: 20, qualityPoints: 4.00 }
    ]
  },
  2: {
    maxMarks: 40,
    minPass: 16,
    table: [
      { minMark: 16, maxMark: 16, qualityPoints: 2.00 },
      { minMark: 17, maxMark: 17, qualityPoints: 2.50 },
      { minMark: 18, maxMark: 18, qualityPoints: 3.00 },
      { minMark: 19, maxMark: 19, qualityPoints: 3.50 },
      { minMark: 20, maxMark: 20, qualityPoints: 4.00 },
      { minMark: 21, maxMark: 21, qualityPoints: 4.33 },
      { minMark: 22, maxMark: 22, qualityPoints: 4.67 },
      { minMark: 23, maxMark: 23, qualityPoints: 5.00 },
      { minMark: 24, maxMark: 24, qualityPoints: 5.33 },
      { minMark: 25, maxMark: 25, qualityPoints: 5.67 },
      { minMark: 26, maxMark: 26, qualityPoints: 6.00 },
      { minMark: 27, maxMark: 27, qualityPoints: 6.33 },
      { minMark: 28, maxMark: 28, qualityPoints: 6.67 },
      { minMark: 29, maxMark: 29, qualityPoints: 7.00 },
      { minMark: 30, maxMark: 30, qualityPoints: 7.33 },
      { minMark: 31, maxMark: 31, qualityPoints: 7.67 },
      { minMark: 32, maxMark: 40, qualityPoints: 8.00 }
    ]
  },
  3: {
    maxMarks: 60,
    minPass: 24,
    table: [
      { minMark: 24, maxMark: 24, qualityPoints: 3.00 },
      { minMark: 25, maxMark: 25, qualityPoints: 3.50 },
      { minMark: 26, maxMark: 26, qualityPoints: 4.00 },
      { minMark: 27, maxMark: 27, qualityPoints: 4.50 },
      { minMark: 28, maxMark: 28, qualityPoints: 5.00 },
      { minMark: 29, maxMark: 29, qualityPoints: 5.50 },
      { minMark: 30, maxMark: 30, qualityPoints: 6.00 },
      { minMark: 31, maxMark: 31, qualityPoints: 6.33 },
      { minMark: 32, maxMark: 32, qualityPoints: 6.67 },
      { minMark: 33, maxMark: 33, qualityPoints: 7.00 },
      { minMark: 34, maxMark: 34, qualityPoints: 7.33 },
      { minMark: 35, maxMark: 35, qualityPoints: 7.67 },
      { minMark: 36, maxMark: 36, qualityPoints: 8.00 },
      { minMark: 37, maxMark: 37, qualityPoints: 8.33 },
      { minMark: 38, maxMark: 38, qualityPoints: 8.67 },
      { minMark: 39, maxMark: 39, qualityPoints: 9.00 },
      { minMark: 40, maxMark: 40, qualityPoints: 9.33 },
      { minMark: 41, maxMark: 41, qualityPoints: 9.67 },
      { minMark: 42, maxMark: 42, qualityPoints: 10.00 },
      { minMark: 43, maxMark: 43, qualityPoints: 10.33 },
      { minMark: 44, maxMark: 44, qualityPoints: 10.67 },
      { minMark: 45, maxMark: 45, qualityPoints: 11.00 },
      { minMark: 46, maxMark: 46, qualityPoints: 11.33 },
      { minMark: 47, maxMark: 47, qualityPoints: 11.67 },
      { minMark: 48, maxMark: 60, qualityPoints: 12.00 }
    ]
  },
  4: {
    maxMarks: 80,
    minPass: 32,
    table: [
      { minMark: 32, maxMark: 32, qualityPoints: 4.00 },
      { minMark: 33, maxMark: 33, qualityPoints: 4.50 },
      { minMark: 34, maxMark: 34, qualityPoints: 5.00 },
      { minMark: 35, maxMark: 35, qualityPoints: 5.50 },
      { minMark: 36, maxMark: 36, qualityPoints: 6.00 },
      { minMark: 37, maxMark: 37, qualityPoints: 6.50 },
      { minMark: 38, maxMark: 38, qualityPoints: 7.00 },
      { minMark: 39, maxMark: 39, qualityPoints: 7.50 },
      { minMark: 40, maxMark: 40, qualityPoints: 8.00 },
      { minMark: 41, maxMark: 41, qualityPoints: 8.33 },
      { minMark: 42, maxMark: 42, qualityPoints: 8.67 },
      { minMark: 43, maxMark: 43, qualityPoints: 9.00 },
      { minMark: 44, maxMark: 44, qualityPoints: 9.33 },
      { minMark: 45, maxMark: 45, qualityPoints: 9.67 },
      { minMark: 46, maxMark: 46, qualityPoints: 10.00 },
      { minMark: 47, maxMark: 47, qualityPoints: 10.33 },
      { minMark: 48, maxMark: 48, qualityPoints: 10.67 },
      { minMark: 49, maxMark: 49, qualityPoints: 11.00 },
      { minMark: 50, maxMark: 50, qualityPoints: 11.33 },
      { minMark: 51, maxMark: 51, qualityPoints: 11.67 },
      { minMark: 52, maxMark: 52, qualityPoints: 12.00 },
      { minMark: 53, maxMark: 53, qualityPoints: 12.33 },
      { minMark: 54, maxMark: 54, qualityPoints: 12.67 },
      { minMark: 55, maxMark: 55, qualityPoints: 13.00 },
      { minMark: 56, maxMark: 56, qualityPoints: 13.33 },
      { minMark: 57, maxMark: 57, qualityPoints: 13.67 },
      { minMark: 58, maxMark: 58, qualityPoints: 14.00 },
      { minMark: 59, maxMark: 59, qualityPoints: 14.33 },
      { minMark: 60, maxMark: 60, qualityPoints: 14.67 },
      { minMark: 61, maxMark: 61, qualityPoints: 15.00 },
      { minMark: 62, maxMark: 62, qualityPoints: 15.33 },
      { minMark: 63, maxMark: 63, qualityPoints: 15.67 },
      { minMark: 64, maxMark: 80, qualityPoints: 16.00 }
    ]
  },
  5: {
    maxMarks: 100,
    minPass: 40,
    table: [
      { minMark: 40, maxMark: 40, qualityPoints: 5.00 },
      { minMark: 41, maxMark: 41, qualityPoints: 5.50 },
      { minMark: 42, maxMark: 42, qualityPoints: 6.00 },
      { minMark: 43, maxMark: 43, qualityPoints: 6.50 },
      { minMark: 44, maxMark: 44, qualityPoints: 7.00 },
      { minMark: 45, maxMark: 45, qualityPoints: 7.50 },
      { minMark: 46, maxMark: 46, qualityPoints: 8.00 },
      { minMark: 47, maxMark: 47, qualityPoints: 8.50 },
      { minMark: 48, maxMark: 48, qualityPoints: 9.00 },
      { minMark: 49, maxMark: 49, qualityPoints: 9.50 },
      { minMark: 50, maxMark: 50, qualityPoints: 10.00 },
      { minMark: 51, maxMark: 51, qualityPoints: 10.33 },
      { minMark: 52, maxMark: 52, qualityPoints: 10.67 },
      { minMark: 53, maxMark: 53, qualityPoints: 11.00 },
      { minMark: 54, maxMark: 54, qualityPoints: 11.33 },
      { minMark: 55, maxMark: 55, qualityPoints: 11.67 },
      { minMark: 56, maxMark: 56, qualityPoints: 12.00 },
      { minMark: 57, maxMark: 57, qualityPoints: 12.33 },
      { minMark: 58, maxMark: 58, qualityPoints: 12.67 },
      { minMark: 59, maxMark: 59, qualityPoints: 13.00 },
      { minMark: 60, maxMark: 60, qualityPoints: 13.33 },
      { minMark: 61, maxMark: 61, qualityPoints: 13.67 },
      { minMark: 62, maxMark: 62, qualityPoints: 14.00 },
      { minMark: 63, maxMark: 63, qualityPoints: 14.33 },
      { minMark: 64, maxMark: 64, qualityPoints: 14.67 },
      { minMark: 65, maxMark: 65, qualityPoints: 15.00 },
      { minMark: 66, maxMark: 66, qualityPoints: 15.33 },
      { minMark: 67, maxMark: 67, qualityPoints: 15.67 },
      { minMark: 68, maxMark: 68, qualityPoints: 16.00 },
      { minMark: 69, maxMark: 69, qualityPoints: 16.33 },
      { minMark: 70, maxMark: 70, qualityPoints: 16.67 },
      { minMark: 71, maxMark: 71, qualityPoints: 17.00 },
      { minMark: 72, maxMark: 72, qualityPoints: 17.33 },
      { minMark: 73, maxMark: 73, qualityPoints: 17.67 },
      { minMark: 74, maxMark: 74, qualityPoints: 18.00 },
      { minMark: 75, maxMark: 75, qualityPoints: 18.33 },
      { minMark: 76, maxMark: 76, qualityPoints: 18.67 },
      { minMark: 77, maxMark: 77, qualityPoints: 19.00 },
      { minMark: 78, maxMark: 78, qualityPoints: 19.33 },
      { minMark: 79, maxMark: 79, qualityPoints: 19.67 },
      { minMark: 80, maxMark: 100, qualityPoints: 20.00 }
    ]
  }
};

/**
 * Exact UAF Quality Point Lookup
 * @param {number} credits - Course credit hours (1 - 5)
 * @param {number} marks - Obtained marks
 * @returns {number} Quality points (0.00 if below minimum passing mark)
 */
function lookupQualityPoints(credits, marks) {
  const schedule = UAF_QP_SCHEDULE[credits];
  if (!schedule) return 0.00;

  // Failing condition: marks below lowest threshold
  if (marks < schedule.minPass) {
    return 0.00;
  }

  // Exact rounded integer matching
  const roundedMark = Math.round(marks);
  for (const entry of schedule.table) {
    if (roundedMark >= entry.minMark && roundedMark <= entry.maxMark) {
      return entry.qualityPoints;
    }
  }

  // Cap at maximum quality points if marks reach or exceed maximum
  if (roundedMark >= schedule.maxMarks) {
    const lastEntry = schedule.table[schedule.table.length - 1];
    return lastEntry.qualityPoints;
  }

  return 0.00;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('uaf-gpa-form');
  const coursesContainer = document.getElementById('courses-container');
  const addCourseBtn = document.getElementById('add-course-btn');
  const resetBtn = document.getElementById('reset-btn');
  const resultBox = document.getElementById('result-box');
  const gpaResult = document.getElementById('gpa-result');
  const totalQpDisplay = document.getElementById('total-qp');
  const totalCreditsDisplay = document.getElementById('total-credits');
  const coursesCountDisplay = document.getElementById('courses-count');
  const breakdownDetails = document.getElementById('course-breakdown-details');

  function setInputError(input, message) {
    input.classList.add('is-invalid');
    const err = input.parentElement.querySelector('.error-text');
    if (err) {
      err.textContent = message;
      err.classList.add('is-visible');
    }
  }

  function clearInputError(input) {
    input.classList.remove('is-invalid');
    const err = input.parentElement.querySelector('.error-text');
    if (err) {
      err.textContent = '';
      err.classList.remove('is-visible');
    }
  }

  function clearAllErrors() {
    const inputs = coursesContainer.querySelectorAll('.form-input');
    inputs.forEach(inp => clearInputError(inp));
  }

  function renumberRows() {
    const cards = coursesContainer.querySelectorAll('.course-card');
    const total = cards.length;

    cards.forEach((card, index) => {
      const courseNum = index + 1;
      card.dataset.courseIndex = courseNum;

      // Title
      const titleSpan = card.querySelector('.course-title-text');
      if (titleSpan) titleSpan.textContent = `Course ${courseNum}`;

      // Remove button
      const removeBtn = card.querySelector('.btn-remove');
      if (removeBtn) {
        removeBtn.setAttribute('aria-label', `Remove Course ${courseNum}`);
        if (total <= 1) {
          removeBtn.disabled = true;
          removeBtn.setAttribute('aria-disabled', 'true');
          removeBtn.title = 'At least one course is required';
        } else {
          removeBtn.disabled = false;
          removeBtn.removeAttribute('aria-disabled');
          removeBtn.removeAttribute('title');
        }
      }

      // Course Name
      const nameLabel = card.querySelector('.label-course-name');
      const nameInput = card.querySelector('.course-name');
      if (nameLabel) nameLabel.setAttribute('for', `course-name-${courseNum}`);
      if (nameInput) {
        nameInput.id = `course-name-${courseNum}`;
        nameInput.name = `course_name_${courseNum}`;
      }

      // Credit Hours
      const crLabel = card.querySelector('.label-course-credits');
      const crSelect = card.querySelector('.course-credits');
      if (crLabel) crLabel.setAttribute('for', `course-credits-${courseNum}`);
      if (crSelect) {
        crSelect.id = `course-credits-${courseNum}`;
        crSelect.name = `course_credits_${courseNum}`;
      }

      // Obtained Marks
      const marksLabel = card.querySelector('.label-course-marks');
      const marksInput = card.querySelector('.course-marks');
      const marksErr = card.querySelector('.err-marks');
      if (marksLabel) marksLabel.setAttribute('for', `course-marks-${courseNum}`);
      if (marksInput) {
        marksInput.id = `course-marks-${courseNum}`;
        marksInput.name = `course_marks_${courseNum}`;
        marksInput.setAttribute('aria-describedby', `err-marks-${courseNum}`);
      }
      if (marksErr) marksErr.id = `err-marks-${courseNum}`;
    });
  }

  function updateMarksConstraints(card) {
    const crSelect = card.querySelector('.course-credits');
    const marksInput = card.querySelector('.course-marks');
    const credits = Number(crSelect.value);
    const maxMarks = UAF_QP_SCHEDULE[credits].maxMarks;

    marksInput.max = maxMarks;
    marksInput.placeholder = `Max: ${maxMarks}`;

    // Revalidate if marks are currently entered
    const val = marksInput.value.trim();
    if (val !== '') {
      const num = Number(val);
      if (num > maxMarks) {
        setInputError(marksInput, `Marks cannot exceed ${maxMarks} for ${credits} credit hour(s).`);
      } else {
        clearInputError(marksInput);
      }
    }
  }

  function createCourseCard(courseNum, defaultName = '', defaultCredits = 3, defaultMarks = '') {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.dataset.courseIndex = courseNum;
    const maxMarks = UAF_QP_SCHEDULE[defaultCredits].maxMarks;

    card.innerHTML = `
      <div class="course-card-header">
        <span class="course-card-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          <span class="course-title-text">Course ${courseNum}</span>
        </span>
        <button type="button" class="btn-remove" aria-label="Remove Course ${courseNum}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          Remove
        </button>
      </div>
      <div class="form-row-course">
        <div class="form-group">
          <label for="course-name-${courseNum}" class="form-label label-course-name">Course Name (Optional)</label>
          <input type="text" id="course-name-${courseNum}" name="course_name_${courseNum}" class="form-input course-name" placeholder="e.g. Agronomy 101" value="${defaultName}">
        </div>
        <div class="form-group">
          <label for="course-credits-${courseNum}" class="form-label label-course-credits">Credit Hours <span class="required" aria-hidden="true">*</span></label>
          <select id="course-credits-${courseNum}" name="course_credits_${courseNum}" class="form-input course-credits" required>
            <option value="1" ${defaultCredits === 1 ? 'selected' : ''}>1 Cr (Max 20)</option>
            <option value="2" ${defaultCredits === 2 ? 'selected' : ''}>2 Cr (Max 40)</option>
            <option value="3" ${defaultCredits === 3 ? 'selected' : ''}>3 Cr (Max 60)</option>
            <option value="4" ${defaultCredits === 4 ? 'selected' : ''}>4 Cr (Max 80)</option>
            <option value="5" ${defaultCredits === 5 ? 'selected' : ''}>5 Cr (Max 100)</option>
          </select>
        </div>
        <div class="form-group">
          <label for="course-marks-${courseNum}" class="form-label label-course-marks">Obtained Marks <span class="required" aria-hidden="true">*</span></label>
          <input type="number" id="course-marks-${courseNum}" name="course_marks_${courseNum}" class="form-input course-marks" min="0" max="${maxMarks}" step="1" placeholder="Max: ${maxMarks}" value="${defaultMarks}" required aria-describedby="err-marks-${courseNum}">
          <span class="error-text err-marks" id="err-marks-${courseNum}" role="alert"></span>
        </div>
      </div>
    `;

    const crSelect = card.querySelector('.course-credits');
    const marksInput = card.querySelector('.course-marks');
    const nameInput = card.querySelector('.course-name');
    const removeBtn = card.querySelector('.btn-remove');

    crSelect.addEventListener('change', () => {
      updateMarksConstraints(card);
      if (resultBox.classList.contains('is-visible')) {
        calculateGpa(false);
      }
    });

    marksInput.addEventListener('input', () => {
      clearInputError(marksInput);
      if (resultBox.classList.contains('is-visible')) {
        calculateGpa(false);
      }
    });

    nameInput.addEventListener('input', () => {
      if (resultBox.classList.contains('is-visible')) {
        calculateGpa(false);
      }
    });

    removeBtn.addEventListener('click', () => {
      removeCourse(card);
    });

    return card;
  }

  function removeCourse(card) {
    const totalCards = coursesContainer.querySelectorAll('.course-card').length;
    if (totalCards <= 1) return;

    card.remove();
    renumberRows();

    if (resultBox.classList.contains('is-visible')) {
      calculateGpa(false);
    }
  }

  function addCourse() {
    const currentCount = coursesContainer.querySelectorAll('.course-card').length;
    const newCard = createCourseCard(currentCount + 1);
    coursesContainer.appendChild(newCard);
    renumberRows();

    const nameInput = newCard.querySelector('.course-name');
    if (nameInput) nameInput.focus();

    if (resultBox.classList.contains('is-visible')) {
      calculateGpa(false);
    }
  }

  function validateRow(card) {
    let isValid = true;
    const courseNum = card.dataset.courseIndex || '1';
    const crSelect = card.querySelector('.course-credits');
    const marksInput = card.querySelector('.course-marks');
    const credits = Number(crSelect.value);
    const maxMarks = UAF_QP_SCHEDULE[credits].maxMarks;

    clearInputError(marksInput);

    const marksVal = marksInput.value.trim();
    if (marksVal === '') {
      setInputError(marksInput, `Please enter obtained marks for Course ${courseNum}.`);
      isValid = false;
    } else {
      const marksNum = Number(marksVal);
      if (isNaN(marksNum)) {
        setInputError(marksInput, 'Please enter a valid number.');
        isValid = false;
      } else if (marksNum < 0) {
        setInputError(marksInput, 'Marks cannot be negative.');
        isValid = false;
      } else if (marksNum > maxMarks) {
        setInputError(marksInput, `Marks cannot exceed ${maxMarks} for ${credits} credit hour(s).`);
        isValid = false;
      }
    }

    return isValid;
  }

  function calculateGpa(shouldScroll = true) {
    const cards = Array.from(coursesContainer.querySelectorAll('.course-card'));
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

    let totalQualityPoints = 0;
    let totalCreditHours = 0;
    const breakdownList = [];

    cards.forEach((card, index) => {
      const nameVal = card.querySelector('.course-name').value.trim();
      const courseName = nameVal || `Course ${index + 1}`;
      const credits = Number(card.querySelector('.course-credits').value);
      const marks = Number(card.querySelector('.course-marks').value.trim());
      const maxMarks = UAF_QP_SCHEDULE[credits].maxMarks;
      const minPass = UAF_QP_SCHEDULE[credits].minPass;

      const qp = lookupQualityPoints(credits, marks);
      const isPassed = marks >= minPass;

      totalQualityPoints += qp;
      totalCreditHours += credits;

      breakdownList.push({
        name: courseName,
        credits: credits,
        marks: marks,
        maxMarks: maxMarks,
        qp: qp,
        isPassed: isPassed
      });
    });

    if (totalCreditHours <= 0) return;

    const finalGpa = totalQualityPoints / totalCreditHours;

    // Render summary
    gpaResult.textContent = finalGpa.toFixed(2);
    totalQpDisplay.textContent = totalQualityPoints.toFixed(2);
    totalCreditsDisplay.textContent = totalCreditHours.toString();
    coursesCountDisplay.textContent = `${cards.length} ${cards.length === 1 ? 'Course' : 'Courses'}`;

    // Render detailed table
    if (breakdownDetails) {
      let breakdownHtml = `
        <div style="overflow-x: auto; margin-top: var(--space-md);">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; background: #ffffff; border-radius: var(--radius-sm); border: 1px solid rgba(13, 92, 58, 0.2);">
            <thead>
              <tr style="background: var(--color-bg-body); border-bottom: 1px solid rgba(13, 92, 58, 0.2); text-align: left;">
                <th style="padding: 8px 12px; font-weight: 600; color: var(--color-text-main);">Course</th>
                <th style="padding: 8px 12px; font-weight: 600; color: var(--color-text-main);">Credit Hours</th>
                <th style="padding: 8px 12px; font-weight: 600; color: var(--color-text-main);">Marks (Obt / Max)</th>
                <th style="padding: 8px 12px; font-weight: 600; color: var(--color-text-main);">Quality Points</th>
                <th style="padding: 8px 12px; font-weight: 600; color: var(--color-text-main);">Status</th>
              </tr>
            </thead>
            <tbody>
      `;

      breakdownList.forEach(item => {
        const badgeColor = item.isPassed ? '#166534' : '#991b1b';
        const badgeBg = item.isPassed ? '#dcfce7' : '#fee2e2';
        const statusText = item.isPassed ? 'Passed' : 'Fail (0 QP)';

        breakdownHtml += `
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 8px 12px; font-weight: 600; color: var(--color-primary);">${item.name}</td>
            <td style="padding: 8px 12px; color: var(--color-text-main);">${item.credits} Cr</td>
            <td style="padding: 8px 12px; color: var(--color-text-main);">${item.marks} / ${item.maxMarks}</td>
            <td style="padding: 8px 12px; font-weight: 700; color: var(--color-text-main);">${item.qp.toFixed(2)}</td>
            <td style="padding: 8px 12px;">
              <span style="display: inline-block; padding: 2px 8px; font-size: 0.75rem; font-weight: 700; border-radius: 9999px; background-color: ${badgeBg}; color: ${badgeColor};">
                ${statusText}
              </span>
            </td>
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

    resultBox.classList.add('is-visible');

    if (shouldScroll) {
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    if (typeof gtag === 'function') {
      gtag('event', 'calculate_uaf_gpa', {
        event_category: 'calculator',
        courses_count: cards.length,
        final_gpa: Number(finalGpa.toFixed(2))
      });
    }
  }

  function resetCalculator() {
    coursesContainer.innerHTML = '';
    coursesContainer.appendChild(createCourseCard(1, '', 3, ''));
    coursesContainer.appendChild(createCourseCard(2, '', 3, ''));
    coursesContainer.appendChild(createCourseCard(3, '', 3, ''));
    renumberRows();
    clearAllErrors();
    resultBox.classList.remove('is-visible');
    if (breakdownDetails) breakdownDetails.innerHTML = '';

    const firstInput = coursesContainer.querySelector('.course-marks');
    if (firstInput) firstInput.focus();
  }

  // Event Listeners
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateGpa(true);
  });

  addCourseBtn.addEventListener('click', () => {
    addCourse();
  });

  resetBtn.addEventListener('click', () => {
    resetCalculator();
  });

  // Initial setup: render 3 default rows
  resetCalculator();
});
