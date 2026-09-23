/**
 * ==========================================================================
 * Pakistani Student Calculator Tools - UAF Merit Calculator
 * University of Agriculture Faisalabad
 * ==========================================================================
 * 
 * OFFICIAL UAF UNDERGRADUATE WEIGHTAGE CRITERIA:
 * --------------------------------------------------------------------------
 * The official admission criteria for undergraduate programs at UAF is:
 *   - Matriculation (SSC):              30%
 *   - Intermediate Part-I (FSc/HSSC-I): 30%
 *   - UAF Entry Test Score:             40%
 *   Total:                             100%
 * 
 * Note: Entry test total marks are entered by the student (usually 100 marks).
 * ==========================================================================
 */
const UAF_CONFIG = {
  matricWeight: 30,     // Matriculation (SSC) weight percentage
  fscWeight: 30,        // Intermediate Part-I weight percentage
  testWeight: 40        // UAF Entry Test weight percentage
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('uaf-merit-form');
  const resetBtn = document.getElementById('reset-btn');
  const resultBox = document.getElementById('result-box');
  const meritResult = document.getElementById('merit-result');

  // Breakdown displays
  const breakdownMatric = document.getElementById('breakdown-matric');
  const breakdownFsc = document.getElementById('breakdown-fsc');
  const breakdownTest = document.getElementById('breakdown-test');

  // Inputs
  const matricObtInput = document.getElementById('matric-obtained');
  const matricTotInput = document.getElementById('matric-total');
  const fscObtInput = document.getElementById('fsc-obtained');
  const fscTotInput = document.getElementById('fsc-total');
  const testObtInput = document.getElementById('test-obtained');
  const testTotInput = document.getElementById('test-total');

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
    clearError(testObtInput, 'error-test-obtained');
    clearError(testTotInput, 'error-test-total');
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

  // Form submit handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isMatricValid = validatePair(matricObtInput, matricTotInput, 'error-matric-obtained', 'error-matric-total', 'Matric');
    const isFscValid = validatePair(fscObtInput, fscTotInput, 'error-fsc-obtained', 'error-fsc-total', 'Intermediate Part-I');
    const isTestValid = validatePair(testObtInput, testTotInput, 'error-test-obtained', 'error-test-total', 'UAF Entry Test');

    if (!isMatricValid || !isFscValid || !isTestValid) {
      resultBox.classList.remove('is-visible');
      return;
    }

    // Numerical values
    const matricObt = Number(matricObtInput.value.trim());
    const matricTot = Number(matricTotInput.value.trim());
    const fscObt = Number(fscObtInput.value.trim());
    const fscTot = Number(fscTotInput.value.trim());
    const testObt = Number(testObtInput.value.trim());
    const testTot = Number(testTotInput.value.trim());

    // Individual percentage scores
    const matricPct = (matricObt / matricTot) * 100;
    const fscPct = (fscObt / fscTot) * 100;
    const testPct = (testObt / testTot) * 100;

    // Weighted contributions (30% Matric + 30% Inter Part-I + 40% Entry Test)
    const matricContribution = (matricPct * UAF_CONFIG.matricWeight) / 100;
    const fscContribution = (fscPct * UAF_CONFIG.fscWeight) / 100;
    const testContribution = (testPct * UAF_CONFIG.testWeight) / 100;

    // Composite merit percentage
    const finalMerit = matricContribution + fscContribution + testContribution;

    // Render output formatted to 2 decimal places
    meritResult.textContent = `${finalMerit.toFixed(2)}%`;

    if (breakdownMatric) {
      breakdownMatric.textContent = `${matricContribution.toFixed(2)}%`;
      document.getElementById('breakdown-matric-detail').textContent = `${matricPct.toFixed(2)}% (${UAF_CONFIG.matricWeight}% weight)`;
    }

    if (breakdownFsc) {
      breakdownFsc.textContent = `${fscContribution.toFixed(2)}%`;
      document.getElementById('breakdown-fsc-detail').textContent = `${fscPct.toFixed(2)}% (${UAF_CONFIG.fscWeight}% weight)`;
    }

    if (breakdownTest) {
      breakdownTest.textContent = `${testContribution.toFixed(2)}%`;
      document.getElementById('breakdown-test-detail').textContent = `${testPct.toFixed(2)}% (${UAF_CONFIG.testWeight}% weight)`;
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
  const allInputs = [matricObtInput, matricTotInput, fscObtInput, fscTotInput, testObtInput, testTotInput];
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
