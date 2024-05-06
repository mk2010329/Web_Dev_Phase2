import ItemsRepo from "@/app/repo/ItemsRepo";


export default async function Home() {
    // const totalPurchasesPerItemPerYear = await ItemsRepo.getTotalPurchasesPerItemPerYear();
    const top3ItemsLastSixMonths = await ItemsRepo.getTop3ItemsLastSixMonths();
    return(<main>
        {/* <h1>{totalPurchasesPerItemPerYear}</h1> */}
        {top3ItemsLastSixMonths.map((item) => (
        <div key={item.itemId}>
          <h2>{item.itemId}</h2>
          <p>Date : {item.dateOfPurchase}</p>
        </div>
      ))}

    </main>);
}
  