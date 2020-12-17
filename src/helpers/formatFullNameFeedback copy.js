const formatFullNameFeedback = (fullName) => {
  const parts = fullName.split(" ");

  return `${parts[1]} ${parts[0][0]}.`;
};

export default formatFullNameFeedback;
