import Layout from "./components/layout/Layout";

export default function HomePage() {
  return (
    <Layout title="Landing Page">
      <div className="flex flex-col gap-4 2xl:w-1/2">
        <p>Welcome to wikitube..</p>
      <br/>
      <p>Our website is in development stage..</p>
      <p>Dont worry..</p>
      <p>you can still explore wikitube,by clicking login at the top</p>
      <p>Have a nice day</p>
      </div>
    </Layout>
  );
}
