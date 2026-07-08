import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-orange-50 via-slate-50 to-white">

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-7">

        


        
        <br/>
        <h2 className="text-center text-xl font-bold leading-relaxed text-orange-900 md:text-3xl">

          कर्म प्रधान विश्व रचि राखा । जो जस करहि सो तस फल चाखा ॥ 
          <br />
          सकल पदारथ हैं जग मांही। कर्महीन नर पावत नाहीं ॥

        </h2>

        <p className="mt-2 max-w-xl text-center text-lg italic text-gray-600 md:text-xl">

          God has established the universe with karma as the primary force. One reaps the exact fruits of the actions one performs. All material objects exist in the world, But a person devoid of action (karma) achieves nothing.

        </p>
        
        <h1 className="mt-10 font-serif text-7xl font-medium  text-transparent bg-clip-text bg-gradient-to-r from-stone-800 to-blue-700 md:text-5xl">

          KarmYog

        </h1>

        <p className="mt-5 max-w-1xl text-center text-1xl leading-relaxed text-gray-700">

          A productivity system inspired by the philosophy of Karma Yoga.<br/>

          Build discipline.<br/>

          Stay consistent.<br/>

          Focus on your actions.

        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-5">

          <Link
            to="/register"
            className="rounded-xl bg-blue-600 px-7 py-4 text-lg text-white transition hover:bg-blue-700"
          >
            Begin Your Karm
          </Link>

          <Link
            to="/login"
            className="rounded-xl border border-gray-300 px-8 py-4 text-lg transition hover:bg-gray-100"
          >
            Login
          </Link>

        </div>
        <br/><br/>
        <h2 className="text-center text-2xl font-semibold leading-relaxed text-orange-900 md:text-3xl">

          कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।
          <br />
          मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥

        </h2>

        <p className="mt-2 max-w-xl text-center text-lg italic text-gray-600 md:text-xl">

          You only have right to perform your duties and not in the outcome of it.<br/>Don't take credits of your karma and you should not induldge in doing nothing

        </p>

      </div>

    </section>
  );
}