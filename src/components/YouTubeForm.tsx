import {useForm} from 'react-hook-form';
import {DevTool} from "@hookform/devtools";


let renderCount = 0

type FormValues = {
  username: string
  email: string
  channel: string
}
  export const YouTubeForm = () => {
   const form = useForm<FormValues>();
   const {register, control, handleSubmit, formState} = form;
   const {errors} = formState;

   const onSubmit = (data: FormValues) => {
     console.log('Form submitted', data)
   }
   renderCount++
   //const {name, ref, onChange, onBlur} = register("username");
   //console.log(form);

    return (
      <div>
        <h1>YouTube Form ({renderCount / 2})</h1>
         <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className='form-control'>
          <label htmlFor="username">Username</label>
          <input type="text" id="username"
          {...register("username",{
            required: {
              value: true,
              message: "Username is required"
            },
          })}/>
          <p className='error'>{errors.username?.message}</p>
          </div>
          <div className='form-control'>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" {...register("email",{
            pattern: {
              value:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Invalid email format'
            },
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== "admin@example.com" || "Enter a different email address"
                  );
               },
              notBlackListed: (fieldValue) => {
                return (
                  !fieldValue.endsWith("admin@baddomain.com") || "This domain is not supported"  
              );         
            },
          },})}
          />
          <p className='error'>{errors.email?.message}</p>
          </div>
          <div className='form-control'>
          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" {...register("channel",{
            required: "Channel is required",
          })}/>
          <p className='error'>{errors.channel?.message}</p>
          </div>
          <button>Submit</button>
        </form>
        <DevTool control={control}/>
      </div>
    )
  }
  