"use client";

const SECTION_PAD = "px-6 sm:px-12 md:px-20 lg:px-32 py-28 md:py-40";
const INNER = "max-w-5xl mx-auto w-full";
const EYEBROW = "font-inter text-[10px] md:text-xs tracking-[0.45em] text-[#C97818] uppercase mb-8";
const HEADING = "font-garamond font-bold text-[clamp(2.6rem,6vw,5.5rem)] text-[#FFF4DD] leading-[1.08] mb-10";
const DIVIDER = "w-12 h-[1px] bg-gradient-to-r from-[#C97818] to-[#F6A735] mb-12";
const BODY = "font-inter text-[15px] md:text-base text-[#B8946A] leading-[1.85] max-w-xl";

export function Sections() {
  return (
    <div className="relative z-10 bg-[#050301]">

      {/* ── Story ─────────────────────────────────────────── */}
      <section
        id="story"
        className={`min-h-screen flex flex-col justify-center border-t border-[rgba(201,120,24,0.1)] ${SECTION_PAD}`}
      >
        <div className={INNER}>
          <p className={EYEBROW}>01 — Story</p>

          <h2 className={HEADING}>
            Sparkling water,<br />made at home.
          </h2>

          <div className={DIVIDER} />

          <p className={BODY}>
            SodaMax is Mauritius's home carbonation brand — a sleek,
            electricity-free machine that turns plain cold water into fresh
            sparkling water, cocktails, or mocktails in seconds.
          </p>
          <p className={`${BODY} mt-5`}>
            An eco-friendly, cost-effective alternative to store-bought plastic
            bottles. One machine. Endless sparkle.
          </p>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-16">
            {[
              { label: "Up to",      value: "50 L",      sub: "per CO₂ cylinder" },
              { label: "From only",  value: "Rs 3,995",  sub: "originally Rs 5,500" },
              { label: "CO₂ refill", value: "Rs 650",    sub: "free delivery across Mauritius" },
            ].map(({ label, value, sub }) => (
              <div
                key={value}
                className="group flex flex-col gap-3 rounded-2xl border border-[rgba(201,120,24,0.14)] bg-[#0c0702] p-8 hover:border-[rgba(246,167,53,0.3)] transition-colors duration-500"
              >
                <p className="font-inter text-[10px] tracking-[0.4em] text-[#C97818] uppercase">{label}</p>
                <p className="font-garamond text-[2.6rem] leading-none text-[#F6A735]">{value}</p>
                <p className="font-inter text-[13px] text-[#7a5c3a] leading-relaxed">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ────────────────────────────────────── */}
      <section
        id="experience"
        className={`min-h-screen flex flex-col justify-center border-t border-[rgba(201,120,24,0.1)] ${SECTION_PAD}`}
      >
        <div className={INNER}>
          <p className={EYEBROW}>02 — Experience</p>

          <h2 className={HEADING}>
            Four steps.<br />Infinite fizz.
          </h2>

          <div className={DIVIDER} />

          {/* Step cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { num: "01", title: "Prepare",    body: "Lay the machine horizontally to access the cylinder compartment." },
              { num: "02", title: "Insert",     body: "Slide the CO₂ cylinder into place and screw clockwise until tight." },
              { num: "03", title: "Carbonate",  body: "Fill the bottle with cold water, attach to the nozzle, and press until you reach your perfect level of fizz." },
              { num: "04", title: "Enjoy",      body: "Sip fresh sparkling water, a crisp mocktail, or a crafted cocktail — right from your countertop." },
            ].map(({ num, title, body }) => (
              <div
                key={num}
                className="group relative flex flex-col gap-4 rounded-2xl border border-[rgba(201,120,24,0.14)] bg-[#0c0702] p-9 hover:border-[rgba(246,167,53,0.28)] transition-colors duration-500 overflow-hidden"
              >
                <span className="absolute top-6 right-8 font-garamond text-[5rem] leading-none text-[rgba(201,120,24,0.07)] select-none pointer-events-none">
                  {num}
                </span>
                <span className="font-inter text-[10px] tracking-[0.4em] text-[#C97818] uppercase">{num}</span>
                <h3 className="font-garamond text-[1.75rem] text-[#FFF4DD] leading-tight">{title}</h3>
                <p className="font-inter text-[14px] text-[#B8946A] leading-[1.8]">{body}</p>
              </div>
            ))}
          </div>

          {/* Finishes */}
          <div className="mt-10 rounded-2xl border border-[rgba(201,120,24,0.14)] bg-[#0c0702] p-9 flex flex-col sm:flex-row sm:items-center gap-8">
            <div className="flex-1">
              <p className="font-inter text-[10px] tracking-[0.4em] text-[#C97818] uppercase mb-3">
                Available finishes
              </p>
              <div className="flex gap-8 mt-1">
                {[
                  { name: "White",  dot: "bg-[#e8e8e8]" },
                  { name: "Silver", dot: "bg-gradient-to-br from-[#c8c8c8] to-[#888]" },
                  { name: "Black",  dot: "bg-[#1a1a1a] border border-[rgba(255,255,255,0.15)]" },
                ].map(({ name, dot }) => (
                  <div key={name} className="flex flex-col items-center gap-2">
                    <div className={`w-7 h-7 rounded-full ${dot}`} />
                    <span className="font-inter text-[11px] text-[#B8946A] tracking-widest">{name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 border-t sm:border-t-0 sm:border-l border-[rgba(201,120,24,0.1)] pt-6 sm:pt-0 sm:pl-8">
              <p className="font-inter text-[10px] tracking-[0.4em] text-[#C97818] uppercase mb-3">Warranty</p>
              <p className="font-garamond text-3xl text-[#FFF4DD]">1 Year</p>
              <p className="font-inter text-[13px] text-[#7a5c3a] mt-1">Included with every machine</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────── */}
      <section
        id="contact"
        className={`min-h-screen flex flex-col justify-center border-t border-[rgba(201,120,24,0.1)] ${SECTION_PAD}`}
      >
        <div className={INNER}>
          <p className={EYEBROW}>03 — Contact</p>

          <h2 className={HEADING}>
            Bring the spark<br />to your home.
          </h2>

          <div className={DIVIDER} />

          <p className={BODY}>
            Order via the SodaMax Mauritius Facebook page or reach us on
            WhatsApp. Free CO₂ refill delivery across Mauritius — just send us
            a message.
          </p>

          {/* CTA button */}
          <a
            href="https://wa.me/2305255114"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-12 mb-16 px-9 py-4 rounded-xl bg-gradient-to-r from-[#C97818] to-[#F6A735] text-[#050301] font-garamond text-[1.15rem] font-bold tracking-wide hover:opacity-90 active:scale-95 transition-all duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.122 1.528 5.858L0 24l6.322-1.506A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.66-.498-5.2-1.372l-.374-.213-3.754.895.944-3.64-.243-.387A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            WhatsApp — 5255 1145
          </a>

          {/* Contact form */}
          <form
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Your name"
              className="col-span-1 bg-[#0c0702] border border-[rgba(201,120,24,0.18)] rounded-xl px-6 py-4 font-inter text-[14px] text-[#FFF4DD] placeholder-[#4a3520] focus:outline-none focus:border-[#F6A735] transition-colors duration-300"
            />
            <input
              type="email"
              placeholder="Your email"
              className="col-span-1 bg-[#0c0702] border border-[rgba(201,120,24,0.18)] rounded-xl px-6 py-4 font-inter text-[14px] text-[#FFF4DD] placeholder-[#4a3520] focus:outline-none focus:border-[#F6A735] transition-colors duration-300"
            />
            <textarea
              rows={5}
              placeholder="Your message"
              className="col-span-1 sm:col-span-2 bg-[#0c0702] border border-[rgba(201,120,24,0.18)] rounded-xl px-6 py-4 font-inter text-[14px] text-[#FFF4DD] placeholder-[#4a3520] focus:outline-none focus:border-[#F6A735] transition-colors duration-300 resize-none"
            />
            <button
              type="submit"
              className="col-span-1 sm:col-span-2 sm:w-fit px-10 py-4 rounded-xl bg-gradient-to-r from-[#C97818] to-[#F6A735] text-[#050301] font-garamond text-[1.1rem] font-bold tracking-wide hover:opacity-90 active:scale-95 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="border-t border-[rgba(201,120,24,0.1)] px-6 sm:px-12 md:px-20 lg:px-32 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-garamond text-xl tracking-[0.3em] text-[#FFF4DD]">SODAMAX</span>
        <p className="font-inter text-[11px] tracking-[0.4em] text-[#C97818] uppercase">
          Sparkle Every Moment
        </p>
        <p className="font-inter text-[11px] text-[#3a2a16]">© 2026 SodaMax. All rights reserved.</p>
      </footer>

    </div>
  );
}
