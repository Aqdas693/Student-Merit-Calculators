/**
 * ==========================================================================
 * Pakistani Student Calculator Tools - Matric/FSc Aggregate Calculator
 * ==========================================================================
 * 
 * ADJUST WEIGHTAGES HERE:
 * --------------------------------------------------------------------------
 * If your target university, college, or board uses a different weighting formula,
 * simply edit the numerical values below.
 * 
 * Current Default:
 *   - Matriculation (SSC):       10%
 *   - FSc Part 1 (HSSC-I):       40%
 *   - FSc Part 2 (HSSC-II):      50%
 *   Total:                      100%
 * ==========================================================================
 */
const AGGREGATE_WEIGHTS = {
  matric: 10,       // Matric weightage percentage
  fscPart1: 40,     // FSc Part 1 weightage percentage
  fscPart2: 50      // FSc Part 2 weightage percentage
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('aggregate-form');
  const resetBtn = document.getElementById('reset-btn');
  const resultBox = document.getElementById('result-box');
  const aggregateResult = document.getElementById('aggregate-result');

  // Breakdown displays
  const breakdownMatric = document.getElementById('breakdown-matric');
  const breakdownFsc1 = document.getElementById('breakdown-fsc1');
  const breakdownFsc2 = document.getElementById('breakdown-fsc2');

  // Inputs
  const matricObtInput = document.getElementById('matric-obtained');
  const matricTotInput = document.getElementById('matric-total');
  const fsc1ObtInput = document.getElementById('fsc1-obtained');
  const fsc1TotInput = document.getElementById('fsc1-total');
  const fsc2ObtInput = document.getElementById('fsc2-obtained');
  const fsc2TotInput = document.getElementById('fsc2-total');

  // Helper to show inline error
  function setError(inputElement, errorElementId, message) {
    inputElement.classList.add('is-invalid');
    const errSpan = document.getElementById(errorElementId);
    if (errSpan) {
      errSpan.textContent = message;
      errSpan.classList.add('is-visible');
    }
  }

  // Helper to clear inline error
  function clearError(inputElement, errorElementId) {
    inputElement.classList.remove('is-invalid');
    const errSpan = document.getElementById(errorElementId);
    if (errSpan) {
      errSpan.textContent = '';
      errSpan.classList.remove('is-visible');
    }
  }

  // Clear all errors
  function clearAllErrors() {
    clearError(matricObtInput, 'error-matric-obtained');
    clearError(matricTotInput, 'error-matric-total');
    clearError(fsc1ObtInput, 'error-fsc1-obtained');
    clearError(fsc1TotInput, 'error-fsc1-total');
    clearError(fsc2ObtInput, 'error-fsc2-obtained');
    clearError(fsc2TotInput, 'error-fsc2-total');
  }

  // Validate single examination pair (obtained vs total)
  function validatePair(obtInput, totInput, obtErrId, totErrId, examName) {
    let isValid = true;
    const obtVal = obtInput.value.trim();
    const totVal = totInput.value.trim();

    clearError(obtInput, obtErrId);
    clearError(totInput, totErrId);

    // Validate obtained marks
    if (obtVal === '') {
      setError(obtInput, obtErrId, `Please enter ${examName} obtained marks.`);
      isValid = false;
    } else {
      const obtNum = Number(obtVal);
      if (isNaN(obtNum) || obtNum < 0) {
        setError(obtInput, obtErrId, 'Please enter a valid non-negative number.');
        isValid = false;
      }
    }

    // Validate total marks
    if (totVal === '') {
      setError(totInput, totErrId, `Please enter ${examName} total marks.`);
      isValid = false;
    } else {
      const totNum = Number(totVal);
      if (isNaN(totNum) || totNum <= 0) {
        setError(totInput, totErrId, 'Total marks must be greater than zero.');
        isValid = false;
      }
    }

    // Validate obtained <= total
    if (isValid) {
      const obtNum = Number(obtVal);
      const totNum = Number(totVal);
      if (obtNum > totNum) {
        setError(obtInput, obtErrId, `Obtained marks (${obtNum}) cannot exceed total marks (${totNum}).`);
        isValid = false;
      }
    }

    return isValid;
  }

  // Form submit handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isMatricValid = validatePair(matricObtInput, matricTotInput, 'error-matric-obtained', 'error-matric-total', 'Matric');
    const isFsc1Valid = validatePair(fsc1ObtInput, fsc1TotInput, 'error-fsc1-obtained', 'error-fsc1-total', 'FSc Part 1');
    const isFsc2Valid = validatePair(fsc2ObtInput, fsc2TotInput, 'error-fsc2-obtained', 'error-fsc2-total', 'FSc Part 2');

    if (!isMatricValid || !isFsc1Valid || !isFsc2Valid) {
      resultBox.classList.remove('is-visible');
      return;
    }

    // Numerical values
    const matricObt = Number(matricObtInput.value.trim());
    const matricTot = Number(matricTotInput.value.trim());
    const fsc1Obt = Number(fsc1ObtInput.value.trim());
    const fsc1Tot = Number(fsc1TotInput.value.trim());
    const fsc2Obt = Number(fsc2ObtInput.value.trim());
    const fsc2Tot = Number(fsc2TotInput.value.trim());

    // Individual percentages
    const matricPct = (matricObt / matricTot) * 100;
    const fsc1Pct = (fsc1Obt / fsc1Tot) * 100;
    const fsc2Pct = (fsc2Obt / fsc2Tot) * 100;

    // Weighted contributions
    const matricContribution = (matricPct * AGGREGATE_WEIGHTS.matric) / 100;
    const fsc1Contribution = (fsc1Pct * AGGREGATE_WEIGHTS.fscPart1) / 100;
    const fsc2Contribution = (fsc2Pct * AGGREGATE_WEIGHTS.fscPart2) / 100;

    // Total aggregate percentage
    const finalAggregate = matricContribution + fsc1Contribution + fsc2Contribution;

    // Render output (2 decimal places)
    aggregateResult.textContent = `${finalAggregate.toFixed(2)}%`;

    if (breakdownMatric) {
      breakdownMatric.textContent = `${matricContribution.toFixed(2)}%`;
      document.getElementById('breakdown-matric-detail').textContent = `${matricPct.toFixed(2)}% (${AGGREGATE_WEIGHTS.matric}% weight)`;
    }

    if (breakdownFsc1) {
      breakdownFsc1.textContent = `${fsc1Contribution.toFixed(2)}%`;
      document.getElementById('breakdown-fsc1-detail').textContent = `${fsc1Pct.toFixed(2)}% (${AGGREGATE_WEIGHTS.fscPart1}% weight)`;
    }

    if (breakdownFsc2) {
      breakdownFsc2.textContent = `${fsc2Contribution.toFixed(2)}%`;
      document.getElementById('breakdown-fsc2-detail').textContent = `${fsc2Pct.toFixed(2)}% (${AGGREGATE_WEIGHTS.fscPart2}% weight)`;
    }

    // Display result box and scroll smoothly to it
    resultBox.classList.add('is-visible');
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // Reset button handler
  resetBtn.addEventListener('click', () => {
    form.reset();
    clearAllErrors();
    resultBox.classList.remove('is-visible');
    matricObtInput.focus();
  });

  // Live input cleanup on user input
  const allInputs = [matricObtInput, matricTotInput, fsc1ObtInput, fsc1TotInput, fsc2ObtInput, fsc2TotInput];
  allInputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) {
        const errSpan = input.parentElement.querySelector('.error-text');
        if (errSpan) {
          input.classList.remove('is-invalid');
          errSpan.textContent = '';
          errSpan.classList.remove('is-visible');
        }
      }
    });
  });
});
