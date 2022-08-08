import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Route,
  Tags,
} from "tsoa"
import { getAllUsers, createUser, updateUser, deleteUser } from "./user.service"
import { User, UserRoles } from "@prisma/client"

@Tags("User Permission")
@Route("/api/user-permission")
export class UserPermissionController extends Controller {
  @Get("/get-all/")
  public async getAllUser(): Promise<
    (Partial<User> & { userRoles: Partial<UserRoles>[] })[]
  > {
    return getAllUsers()
  }

  @Post("/create/")
  public async createUser(
    @Body()
    body: {
      email: string
      name: string
      password: string
      role: number
    }
  ): Promise<User> {
    return createUser({
      email: body.email,
      name: body.name,
      password: body.password,
      role: body.role,
    })
  }

  @Put("/update/{id}/")
  public async updateUser(
    @Query("id") id: string,
    @Body() body: { email: string; name: string; userRoles: { id: number }[] }
  ): Promise<User> {
    return updateUser({
      id: Number(id),
      email: body.email,
      name: body.name,
      userRoles: body.userRoles,
    })
  }

  @Delete("/delete/{id}/")
  public async deleteUser(@Query("id") id: string): Promise<User> {
    return deleteUser({ id: Number(id) })
  }
}
