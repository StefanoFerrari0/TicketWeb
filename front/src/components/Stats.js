export default function Stats({ stats }) {
  return (
    <div className="my-10">
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-6">
        {stats.map((item) => (
          <div
            key={item.name}
            className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden"
          >
            <dt className="text-base font-normal text-center text-gray-900">{item.name}</dt>
            <dd className="mt-1 flex flex-col items-center justify-center md:block lg:flex">
              <div className="flex text-2xl font-semibold text-indigo-600">
                {item.stat}
              </div>
              <span className={`mt-2 text-lg bold font-semibold text-green-700`}>
                  {item.moreInfo}
                </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
