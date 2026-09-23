/**
 * ==========================================================================
 * Pakistani Student Calculator Tools - MDCAT Merit Calculator
 * ==========================================================================
 * 
 * ADJUST WEIGHTAGES & TOTALS HERE:
 * --------------------------------------------------------------------------
 * The official PM&DC criteria for MBBS and BDS admissions in Pakistan is:
 *   - Matriculation (SSC):              10%
 *   - FSc Pre-Medical (HSSC):           40%
 *   - MDCAT Test Score:                 50%
 *   - MDCAT Total Test Marks:           180
 * 
 * If PM&DC or an admitting authority updates these guidelines, you can edit
 * the configuration object below directly.
 * ==========================================================================
 */
const MDCAT_CONFIG = {
  matricWeight: 10,     // Matriculation weight percentage
  fscWeight: 40,        // FSc Pre-Medical weight percentage
  mdcatWeight: 50,      // MDCAT test weight percentage
  mdcatTotal: 180       // Fixed PM&DC MDCAT test denominator
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('mdcat-form');
  const resetBtn = document.getElementById('reset-btn');
  const resultBox = document.getElementById('result-box');
  const meritResult = document.getElementById('merit-result');

  // Breakdown displays
  const breakdownMatric = document.getElementById('breakdown-matric');
  const breakdownFsc = document.getElementById('breakdown-fsc');
  const breakdownMdcat = document.getElementById('breakdown-mdcat');

  // Inputs
  const matricObtInput = document.getElementById('matric-obtained');
  const matricTotInput = document.getElementById('matric-total');
  const fscObtInput = document.getElementById('fsc-obtained');
  const fscTotInput = document.getElementById('fsc-total');
  const mdcatObtInput = document.getElementById('mdcat-obtained');

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
    clearError(mdcatObtInput, 'error-mdcat-obtained');
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

  // Validate MDCAT score (out of fixed total)
  function validateMdcat(obtInput, obtErrId) {
    let isValid = true;
    const obtVal = obtInput.value.trim();

    clearError(obtInput, obtErrId);

    if (obtVal === '') {
      setError(obtInput, obtErrId, 'Please enter your MDCAT obtained score.');
      isValid = false;
    } else {
      const obtNum = Number(obtVal);
      if (isNaN(obtNum) || obtNum < 0) {
        setError(obtInput, obtErrId, 'Please enter a valid non-negative number.');
        isValid = false;
      } else if (obtNum > MDCAT_CONFIG.mdcatTotal) {
        setError(obtInput, obtErrId, `MDCAT score (${obtNum}) cannot exceed ${MDCAT_CONFIG.mdcatTotal} marks.`);
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
    const isMdcatValid = validateMdcat(mdcatObtInput, 'error-mdcat-obtained');

    if (!isMatricValid || !isFscValid || !isMdcatValid) {
      resultBox.classList.remove('is-visible');
      return;
    }

    // Numerical values
    const matricObt = Number(matricObtInput.value.trim());
    const matricTot = Number(matricTotInput.value.trim());
    const fscObt = Number(fscObtInput.value.trim());
    const fscTot = Number(fscTotInput.value.trim());
    const mdcatObt = Number(mdcatObtInput.value.trim());

    // Individual percentage scores
    const matricPct = (matricObt / matricTot) * 100;
    const fscPct = (fscObt / fscTot) * 100;
    const mdcatPct = (mdcatObt / MDCAT_CONFIG.mdcatTotal) * 100;

    // Weighted contributions
    const matricContribution = (matricPct * MDCAT_CONFIG.matricWeight) / 100;
    const fscContribution = (fscPct * MDCAT_CONFIG.fscWeight) / 100;
    const mdcatContribution = (mdcatPct * MDCAT_CONFIG.mdcatWeight) / 100;

    // Composite merit percentage
    const finalMerit = matricContribution + fscContribution + mdcatContribution;

    // Render output formatted to 2 decimal places
    meritResult.textContent = `${finalMerit.toFixed(2)}%`;

    if (breakdownMatric) {
      breakdownMatric.textContent = `${matricContribution.toFixed(2)}%`;
      document.getElementById('breakdown-matric-detail').textContent = `${matricPct.toFixed(2)}% (${MDCAT_CONFIG.matricWeight}% weight)`;
    }

    if (breakdownFsc) {
      breakdownFsc.textContent = `${fscContribution.toFixed(2)}%`;
      document.getElementById('breakdown-fsc-detail').textContent = `${fscPct.toFixed(2)}% (${MDCAT_CONFIG.fscWeight}% weight)`;
    }

    if (breakdownMdcat) {
      breakdownMdcat.textContent = `${mdcatContribution.toFixed(2)}%`;
      document.getElementById('breakdown-mdcat-detail').textContent = `${mdcatPct.toFixed(2)}% (${MDCAT_CONFIG.mdcatWeight}% weight)`;
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
  const allInputs = [matricObtInput, matricTotInput, fscObtInput, fscTotInput, mdcatObtInput];
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
