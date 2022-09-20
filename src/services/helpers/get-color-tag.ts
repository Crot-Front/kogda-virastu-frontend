const getColorTag = (
  isActive : boolean | undefined,
  isLocationArticle : boolean | undefined,
  activeColorFollowArticle : string,
  activeColor : string,
  baseColor : string,
) : string => {
  if (isActive && isLocationArticle) {
    return activeColorFollowArticle;
  }
  if (isActive && !isLocationArticle) {
    return activeColor;
  }
  return baseColor;
};

export default getColorTag;
