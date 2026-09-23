/**
 * ==========================================================================
 * Pakistani Student Calculator Tools - ECAT Merit Calculator
 * ==========================================================================
 * 
 * ADJUST WEIGHTAGES & TOTALS HERE:
 * --------------------------------------------------------------------------
 * The standard default criteria for UET engineering admissions is:
 *   - Matriculation (SSC):              17%
 *   - FSc Pre-Engineering (HSSC):       50%
 *   - ECAT Test Score:                  33%
 *   - ECAT Total Test Marks:            400
 * 
 * NOTE FOR SITE ADMIN:
 * This 17/50/33 split should be verified against official UET admission
 * guidelines (ecat.uet.edu.pk) before final deployment. You can easily adjust
 * the configuration values below if the ratio differs for a given intake.
 * ==========================================================================
 */
const ECAT_CONFIG = {
  matricWeight: 17,     // Matriculation weight percentage
  fscWeight: 50,        // FSc Pre-Engineering weight percentage
  ecatWeight: 33,       // ECAT test score weight percentage
  ecatTotal: 400        // Standard ECAT total test marks
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('ecat-form');
  const resetBtn = document.getElementById('reset-btn');
  const resultBox = document.getElementById('result-box');
  const meritResult = document.getElementById('merit-result');

  // Breakdown displays
  const breakdownMatric = document.getElementById('breakdown-matric');
  const breakdownFsc = document.getElementById('breakdown-fsc');
  const breakdownEcat = document.getElementById('breakdown-ecat');

  // Inputs
  const matricObtInput = document.getElementById('matric-obtained');
  const matricTotInput = document.getElementById('matric-total');
  const fscObtInput = document.getElementById('fsc-obtained');
  const fscTotInput = document.getElementById('fsc-total');
  const ecatObtInput = document.getElementById('ecat-obtained');

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
    clearError(ecatObtInput, 'error-ecat-obtained');
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

  // Validate ECAT score (out of fixed 400 total)
  function validateEcat(obtInput, obtErrId) {
    let isValid = true;
    const obtVal = obtInput.value.trim();

    clearError(obtInput, obtErrId);

    if (obtVal === '') {
      setError(obtInput, obtErrId, 'Please enter your ECAT obtained score.');
      isValid = false;
    } else {
      const obtNum = Number(obtVal);
      if (isNaN(obtNum) || obtNum < 0) {
        setError(obtInput, obtErrId, 'Please enter a valid non-negative number.');
        isValid = false;
      } else if (obtNum > ECAT_CONFIG.ecatTotal) {
        setError(obtInput, obtErrId, `ECAT score (${obtNum}) cannot exceed ${ECAT_CONFIG.ecatTotal} marks.`);
        isValid = false;
      }
    }

    return isValid;
  }

  // Form submit handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isMatricValid = validatePair(matricObtInput, matricTotInput, 'error-matric-obtained', 'error-matric-total', 'Matric');
    const isFscValid = validatePair(fscObtInput, fscTotInput, 'error-fsc-obtained', 'error-fsc-total', 'FSc Pre-Engineering');
    const isEcatValid = validateEcat(ecatObtInput, 'error-ecat-obtained');

    if (!isMatricValid || !isFscValid || !isEcatValid) {
      resultBox.classList.remove('is-visible');
      return;
    }

    // Numerical values
    const matricObt = Number(matricObtInput.value.trim());
    const matricTot = Number(matricTotInput.value.trim());
    const fscObt = Number(fscObtInput.value.trim());
    const fscTot = Number(fscTotInput.value.trim());
    const ecatObt = Number(ecatObtInput.value.trim());

    // Individual percentage scores
    const matricPct = (matricObt / matricTot) * 100;
    const fscPct = (fscObt / fscTot) * 100;
    const ecatPct = (ecatObt / ECAT_CONFIG.ecatTotal) * 100;

    // Weighted contributions
    const matricContribution = (matricPct * ECAT_CONFIG.matricWeight) / 100;
    const fscContribution = (fscPct * ECAT_CONFIG.fscWeight) / 100;
    const ecatContribution = (ecatPct * ECAT_CONFIG.ecatWeight) / 100;

    // Composite merit percentage
    const finalMerit = matricContribution + fscContribution + ecatContribution;

    // Render output formatted to 2 decimal places
    meritResult.textContent = `${finalMerit.toFixed(2)}%`;

    if (breakdownMatric) {
      breakdownMatric.textContent = `${matricContribution.toFixed(2)}%`;
      document.getElementById('breakdown-matric-detail').textContent = `${matricPct.toFixed(2)}% (${ECAT_CONFIG.matricWeight}% weight)`;
    }

    if (breakdownFsc) {
      breakdownFsc.textContent = `${fscContribution.toFixed(2)}%`;
      document.getElementById('breakdown-fsc-detail').textContent = `${fscPct.toFixed(2)}% (${ECAT_CONFIG.fscWeight}% weight)`;
    }

    if (breakdownEcat) {
      breakdownEcat.textContent = `${ecatContribution.toFixed(2)}%`;
      document.getElementById('breakdown-ecat-detail').textContent = `${ecatPct.toFixed(2)}% (${ECAT_CONFIG.ecatWeight}% weight)`;
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
  const allInputs = [matricObtInput, matricTotInput, fscObtInput, fscTotInput, ecatObtInput];
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
