export const validateRecord = (data) => {
  const errors = {};

  // Serial No
  if (!data.serialNo && data.serialNo !== 0) {
    errors.serialNo = "Serial number is required";
  } else if (data.serialNo < 1) {
    errors.serialNo = "Serial number must be greater than 0";
  }

  // Name
  if (!data.name?.trim()) {
    errors.name = "Name is required";
  }

  // Father Name
  if (!data.fatherName?.trim()) {
    errors.fatherName = "Father name is required";
  }

  // Voter No
  if (!data.voterNo?.trim()) {
    errors.voterNo = "Voter number is required";
  } else if (data.voterNo.length < 6) {
    errors.voterNo = "Voter number must be at least 6 characters";
  }

  // House (optional but validate if exists)
  if (data.house && data.house.trim().length < 2) {
    errors.house = "House name is too short";
  }

  // Holding No (optional)
  if (data.holdingNo && data.holdingNo.trim().length < 1) {
    errors.holdingNo = "Holding number is invalid";
  }

  return errors;
};
