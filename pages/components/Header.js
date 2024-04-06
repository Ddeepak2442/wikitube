export default function Header() {
    return (
      <header
        className="flex justify-center items-center px-16 py-2 whitespace-nowrap max-w-[1211px] text-neutral-950"
        aria-label="Header"
      >
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium">MicroSim</h1>
          <div className="text-xs italic">
            <span className="italic text-neutral-950">Powered by </span>
            <span className="italic text-neutral-950">Execubots</span>
          </div>
        </div>
      </header>
    );
  }
  