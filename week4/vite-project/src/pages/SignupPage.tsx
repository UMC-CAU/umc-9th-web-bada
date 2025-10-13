import {z} from "zod";
import {type SubmitHandler,useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { postSignup } from "../apis/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



const schema = z.object({
    email: z.string().email({message: "올바른 이메일 형식이 아닙니다."}),
    password: z
    .string()
    .min(8,{message:"비밀번호는 8자 이상이어야 합니다.",})
    .max(20,{message:"비밀번호는 20자 이하여야 합니다.",}),
    
    passwordCheck: z
    .string()
    .min(8,{message:"비밀번호는 8자 이상이어야 합니다.",})
    .max(20,{message:"비밀번호는 20자 이하여야 합니다.",}),

    name: z.string().min(1,{message:"이름을 입력해주세요."}),
    bio: z.string().optional(),
    avatar: z.string().optional(),

})
.refine((data)=> data.password === data.passwordCheck, {message:"비밀번호가 일치하지 않습니다.",
        path: ["passwordCheck"],
    });

type FormFields = z.infer<typeof schema>

const SignupPage =() => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);

    const {
        register,
        handleSubmit,
        trigger,
        formState: {errors, isSubmitting},
    } =useForm<FormFields>({
        defaultValues: {
            name: "",
            email:"",
            password:"",
            passwordCheck:"",
        },
        resolver:zodResolver(schema),
        mode: "onBlur"
    });

    const handleNext = async () => {
    let currentFields: (keyof FormFields)[] = [];
    if (step === 1) currentFields = ["email"];
    if (step === 2) currentFields = ["password", "passwordCheck"];
    if (step === 3) currentFields = ["nickName"];

    const valid = await trigger(currentFields);
    if (valid) {
      setStep((prev) => prev + 1);
    }
        };

    const onSubmit: SubmitHandler<FormFields> = 
        async (data) => {

            try {
                const { passwordCheck, ...rest } = data;
                const response = await postSignup(rest);
                console.log(response);

                alert("회원가입 성공");

                navigate("/");
            } catch (error: any) {
                const errorMessage = error.response?.data?.message ||error.message || "오류가 발생했습니다.";
                alert(`회원가입 실패: ${errorMessage}`);
                console.error("회원가입 실패:", errorMessage);
            }
        }



    return (
        <div className = "flex flex-col items-center justify-center h-full gap-4">
            <div className = "flex flex-col gap-3">
                {step === 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4">회원가입</h2>
          <button
            type="button"
            onClick={() => setStep(1)}  
            className="w-[300px] bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer"
          >
            회원가입 시작
          </button>
          <Link to={"/"}>
            <div className="text-blue-500 hover:underline text-sm text-center mt-2">
              HomePage
            </div>
          </Link>
        </>
      )}

                {step == 1 && (
                    <>
                    <input
                {...register("email")}
                
                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                ${errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                type = {"email"}
                placeholder ={"이메일"}/>
                {errors.email && <div className={"text-red-500 text-sm"}>{errors.email.message}</div>}

                <button
              type="submit"
              onClick={handleNext}
              className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer"
            >
              다음
            </button>
                    
                    </>
                )}
                
                {step ===2 && (
                    <>
                    <div className = 'relative'>
                        <input
                {...register("password")}
                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                ${errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                type = {"password"}
                placeholder ={"비밀번호"}/>
                </div>
                {errors.password && <div className={"text-red-500 text-sm"}>{errors.password.message}</div>}

                <div className="relative">
                <input
                {...register("passwordCheck")}
                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                ${errors?.passwordCheck ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                type = {"password"}
                placeholder ={"비밀번호 확인"}/>
                </div>
                {errors.passwordCheck && <div className={"text-red-500 text-sm"}>{errors.passwordCheck.message}</div>}
                
                <button
              type="submit"
              onClick={handleNext}
              className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer"
            >
              다음
            </button>
                    </>
                )}
                
                {step === 3 && (
                    <>
                    <input
                {...register("name")}
                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                ${errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                type = {"name"}
                placeholder ={"이름"}/>
                {errors.name && <div className={"text-red-500 text-sm"}>{errors.name.message}</div>}
                
                <button 
                type ="button"
                onClick = {handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className = "w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300">
                    회원가입
                </button>
                <Link to={"/"}>
          <div className="text-blue-500 hover:underline text-sm text-center mt-2">
            HomePage</div>
        </Link>
                    </>
                )}
                


                
            </div>
        </div>
    );
};

export default SignupPage;