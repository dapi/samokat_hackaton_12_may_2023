const MakeBooking = () => {
  return (
    <div className="flex justify-center mt-8">
      <form className="rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] max-w-fit">
        <h2 className="text-2xl text-center">Время бронирования</h2>
        <div>
          <input
            type="text"
            placeholder="Время от"
            className="mt-4 w-80 border-2 border-grey rounded-lg p-2 focus:outline-none focus:ring-1"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Время до"
            className="w-80 mt-4 border-2 border-grey rounded-lg p-2 focus:outline-none focus:ring-1"
          />
        </div>
        <div className="mt-4">
          <label>Дата от</label>
          <input
            type="date"
            className="w-80 block mt-2 border-2 border-grey rounded-lg p-2 focus:outline-none focus:ring-1"
          />
        </div>
        <div className="mt-4">
          <label>Дата до</label>
          <input
            type="date"
            className="w-80 block mt-2 border-2 border-grey rounded-lg p-2 focus:outline-none focus:ring-1"
          />
        </div>
        <button
          type="submit"
          className="mt-4 rounded-md bg-coral text-center text-white px-2 py-2 w-full hover:bg-coralDark"
        >
          Применить
        </button>
      </form>
    </div>
  );
};

export default MakeBooking;
