type Props = {};

const Home = (props: Props) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Home Page</h1>
      <p>
        This is a sample text to test the scrolling behavior in the main content
        area. Keep adding more text to ensure it scrolls properly. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in
        eros elementum tristique. Duis cursus, mi quis viverra ornare, eros
        dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus
        nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
        tristique posuere.
      </p>
      <p>
        Another paragraph for testing. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Suspendisse varius enim in eros elementum tristique.
        Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
        commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id
        rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
      </p>
    </div>
  );
};

export default Home;
