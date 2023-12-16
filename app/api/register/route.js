import { connectMongodb } from "@/lib/mongodb";
import User from "@/models/user";
import  bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
export async function POST(req) {
    try{
        // Destructuring Request Body:
      const { name, email, password } = await req.json();
      // console.log("Name :",name);
      // console.log("Email :",email);
      // console.log("Password :",password);

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Connect to MongoDB
      await connectMongodb();
    //   Creating User in MongoDB
      await User.create({ name, email, password: hashedPassword });
    //   Returning Success Response:
      return NextResponse.json({ message: "user registered" }, { status: 201 });
    }
    // Error Handling:
    catch(error){
        return  NextResponse.json({message:'Error occurs while user registerd'},{status:500})

    }


    
}




