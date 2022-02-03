import { withUserInfo } from "components/authentication";
import { ArticleProfileTag } from "components/profileTag";

const ProfileInfo = withUserInfo(({ userInfo }) => {
  const contact = userInfo?.email;
  const name = userInfo?.name;
  const image = userInfo?.picture ? { url: userInfo?.picture } : undefined;
  if (!name) return null;
  return <ArticleProfileTag name={name} contact={contact} image={image} />;
});

export default ProfileInfo;
