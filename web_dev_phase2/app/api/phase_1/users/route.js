import UsersRepo from "@/app/phase_1_repo/UsersRepo";

export async function GET(request){

        const Items = await UsersRepo.getUsers();
        return Response.json(Items,{status:200});
}