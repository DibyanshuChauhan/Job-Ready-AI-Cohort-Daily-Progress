import { motion } from "framer-motion";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-12">
      {/* Background Glow */}
      <div className="absolute -left-44 -top-44 h-128 w-lg rounded-full bg-cyan-500/15 blur-[160px]" />

      <div className="absolute -right-44 bottom-0 h-136 w-136 rounded-full bg-blue-500/15 blur-[180px]" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-950/40 to-slate-950" />

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)
          `,
          backgroundSize: "42px 42px",
        }}
      />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
        className="
          relative
          z-10
          w-full
          max-w-md
          rounded-3xl
          border
          border-slate-800/80
          bg-slate-900/65
          p-8
          shadow-[0_20px_80px_rgba(0,0,0,0.55)]
          backdrop-blur-2xl
          md:p-10
        "
      >
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {title}
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">{subtitle}</p>
        </div>

        {children}
      </motion.div>
    </div>
  );
};

export default AuthLayout;
