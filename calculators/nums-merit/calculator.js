/**
 * ==========================================================================
 * Pakistani Student Calculator Tools - NUMS Merit Calculator
 * ==========================================================================
 * 
 * ADJUST WEIGHTAGES & TOTALS HERE:
 * --------------------------------------------------------------------------
 * Default formula for NUMS (Army Medical College & affiliated colleges):
 *   - Matriculation (SSC):              10%
 *   - FSc Pre-Medical (HSSC):           40%
 *   - NUMS Entry Test:                  50%
 *   - NUMS Total Test Marks:            200
 * 
 * Note: If NUMS introduces tiered formulas for constituent (e.g. Army Medical
 * College) vs. private affiliated institutions or updates criteria, adjust
 * these values below.
 * ==========================================================================
 */
const NUMS_CONFIG = {
  matricWeight: 10,     // Matriculation weight percentage
  fscWeight: 40,        // FSc Pre-Medical weight percentage
  numsWeight: 50,       // NUMS entry test weight percentage
  numsTotal: 200        // Fixed NUMS test denominator (200 marks)
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('nums-form');
  const resetBtn = document.getElementById('reset-btn');
  const resultBox = document.getElementById('result-box');
  const meritResult = document.getElementById('merit-result');

  // Breakdown displays
  const breakdownMatric = document.getElementById('breakdown-matric');
  const breakdownFsc = document.getElementById('breakdown-fsc');
  const breakdownNums = document.getElementById('breakdown-nums');

  // Inputs
  const matricObtInput = document.getElementById('matric-obtained');
  const matricTotInput = document.getElementById('matric-total');
  const fscObtInput = document.getElementById('fsc-obtained');
  const fscTotInput = document.getElementById('fsc-total');
  const numsObtInput = document.getElementById('nums-obtained');

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
    clearError(fscObtInput, 'error-fsc-obtained');
    clearError(fscTotInput, 'error-fsc-total');
    clearError(numsObtInput, 'error-nums-obtained');
  }

  // Validate obtained vs total pair
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

  // Validate NUMS score (out of fixed 200 total)
  function validateNums(obtInput, obtErrId) {
    let isValid = true;
    const obtVal = obtInput.value.trim();

    clearError(obtInput, obtErrId);

    if (obtVal === '') {
      setError(obtInput, obtErrId, 'Please enter your NUMS Entry Test score.');
      isValid = false;
    } else {
      const obtNum = Number(obtVal);
      if (isNaN(obtNum) || obtNum < 0) {
        setError(obtInput, obtErrId, 'Please enter a valid non-negative number.');
        isValid = false;
      } else if (obtNum > NUMS_CONFIG.numsTotal) {
        setError(obtInput, obtErrId, `NUMS score (${obtNum}) cannot exceed ${NUMS_CONFIG.numsTotal} marks.`);
        isValid = false;
      }
    }

    return isValid;
  }

  // Form submit handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isMatricValid = validatePair(matricObtInput, matricTotInput, 'error-matric-obtained', 'error-matric-total', 'Matric');
    const isFscValid = validatePair(fscObtInput, fscTotInput, 'error-fsc-obtained', 'error-fsc-total', 'FSc Pre-Medical');
    const isNumsValid = validateNums(numsObtInput, 'error-nums-obtained');

    if (!isMatricValid || !isFscValid || !isNumsValid) {
      resultBox.classList.remove('is-visible');
      return;
    }

    // Numerical values
    const matricObt = Number(matricObtInput.value.trim());
    const matricTot = Number(matricTotInput.value.trim());
    const fscObt = Number(fscObtInput.value.trim());
    const fscTot = Number(fscTotInput.value.trim());
    const numsObt = Number(numsObtInput.value.trim());

    // Individual percentage scores
    const matricPct = (matricObt / matricTot) * 100;
    const fscPct = (fscObt / fscTot) * 100;
    const numsPct = (numsObt / NUMS_CONFIG.numsTotal) * 100;

    // Weighted contributions
    const matricContribution = (matricPct * NUMS_CONFIG.matricWeight) / 100;
    const fscContribution = (fscPct * NUMS_CONFIG.fscWeight) / 100;
    const numsContribution = (numsPct * NUMS_CONFIG.numsWeight) / 100;

    // Composite merit percentage
    const finalMerit = matricContribution + fscContribution + numsContribution;

    // Render output formatted to 2 decimal places
    meritResult.textContent = `${finalMerit.toFixed(2)}%`;

    if (breakdownMatric) {
      breakdownMatric.textContent = `${matricContribution.toFixed(2)}%`;
      document.getElementById('breakdown-matric-detail').textContent = `${matricPct.toFixed(2)}% (${NUMS_CONFIG.matricWeight}% weight)`;
    }

    if (breakdownFsc) {
      breakdownFsc.textContent = `${fscContribution.toFixed(2)}%`;
      document.getElementById('breakdown-fsc-detail').textContent = `${fscPct.toFixed(2)}% (${NUMS_CONFIG.fscWeight}% weight)`;
    }

    if (breakdownNums) {
      breakdownNums.textContent = `${numsContribution.toFixed(2)}%`;
      document.getElementById('breakdown-nums-detail').textContent = `${numsPct.toFixed(2)}% (${NUMS_CONFIG.numsWeight}% weight)`;
    }

    // Display result box and smooth scroll
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

  // Live error clearing on input
  const allInputs = [matricObtInput, matricTotInput, fscObtInput, fscTotInput, numsObtInput];
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
