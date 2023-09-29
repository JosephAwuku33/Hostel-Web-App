export default function SubmitPayment() {
  return (
    <section className="flex md:justify-start justify-center h-screen p-8">
      <form name="submitPaymentform">
        <div className="p-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Select your Payment Type
          </label>
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>Bank</option>
            <option>Momo</option>
          </select>

          <br />

          <label>Enter Depositor's Name</label>
          <input
            type="text"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name"
          />
          <p
            id="helper-text-explanation"
            className="mt-2 text-sm text-gray-500 dark:text-gray-400"
          >
            We’ll never share your details. Read our
            <a
              href="#"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Privacy Policy
            </a>
            .
          </p>

          <br />

          <label>Enter Bank reference</label>
          <input
            type="text"
            placeholder="Bank Reference"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />

          <br />

          <label>Enter Amount</label>
          <input
            type="number"
            placeholder="0.00"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />

          <br />

          <label
            placeholder="message"
            className="block mb-2 text-sm font-medium text-gray-90"
          >
            Optional message
          </label>
          <textarea
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Any aditional mesage..."
          ></textarea>

          <br />
          <div className="flex flex-row justify-center">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
