import UsersRepo from "@/app/phase_1_repo/UsersRepo";

export async function GET(request){
        const { searchParams } = new URL(request.url)
        const user = searchParams.get('user')
        const pass = searchParams.get('pass')
        const loggedInUser = await UsersRepo.findUser(user,pass);
        return Response.json(loggedInUser,{status:200});
}