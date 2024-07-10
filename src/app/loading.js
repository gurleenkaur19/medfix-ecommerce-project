export default function AdminView() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between text-red-500">
      <section className="flex items-center justify-center h-screen">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="relative overflow-hidden bg-white mx-4 h-20 w-5 rounded-full shadow-lg"
            style={{
              "--i": i,
              boxShadow:
                "15px 15px 20px rgba(0, 0, 0, 0.1), -15px -15px 30px #fff, inset -5px -5px 10px rgba(0, 0, 255, 0.1), inset 5px 5px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className="absolute top-0 left-0 h-5 w-5 rounded-full"
              style={{
                animation: "animate_2 2.5s ease-in-out infinite",
                animationDelay: `calc(-0.5s * var(--i))`,
                boxShadow:
                  "inset 0px 0px 0px rgba(0, 0, 0, 0.3), 0px 420px 0 400px #c832fa, inset 0px 0px 0px rgba(0, 0, 0, 0.1)",
              }}
            ></div>
          </div>
        ))}
      </section>
      );
    </main>
  );
}
