import ItemsRepo from "@/app/repo/ItemsRepo";


export async function GET(request){

        const Items = await ItemsRepo.getAllItems();
        return Response.json(Items,{status:200});

}

