import ItemsRepo from "@/app/repo/ItemsRepo";


export default async function Home() {
    // const totalPurchasesPerItemPerYear = await ItemsRepo.getTotalPurchasesPerItemPerYear();
    // const top3ItemsLastSixMonths = await ItemsRepo.getTop3ItemsLastSixMonths();

     const allItems = await ItemsRepo.getItems();
    return(<main>
        {/* <h1>{totalPurchasesPerItemPerYear}</h1> */}
        {/* {top3ItemsLastSixMonths.map((item) => (
        <div key={item.itemId}>
          <h2>{item.itemId}</h2>
          <p>Date : {item.dateOfPurchase}</p>
        </div>
      ))} */}
          <h2>All Items Displayed</h2>
          {allItems.map((item) => (
        <div>
          <img src={item.pictureUrl}></img>
          <p>Title : {item.itemName}</p>
          <p>Price : {item.price}</p>
          <p>Quantity : {item.quantity}</p>
        </div>
      ))}

          <p>Date : 6th may 2024</p>
   

    </main>);
}
  