import Posts from "../Posts/Posts";
import Profile from "../Profile/Profile";
import Stories from "../Stories/Stories";
import Suggestions from "../Suggestions/Suggestions";

export default function Feed() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-2xl xl:grid-cols-3 xl:max-w-5xl mx-auto">
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>
      <section className="hidden xl:inline-grid md:col-span-1">
        <div className="fixed top-15">
          <Profile />
          <Suggestions />
        </div>
      </section>
    </main>
  );
}
