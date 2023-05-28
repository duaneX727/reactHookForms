import {useForm, useFieldArray} from 'react-hook-form';
import {DevTool} from "@hookform/devtools";


let renderCount = 0

type FormValues = {
  username: string
  email: string
  channel: string
  social: {
    twitter: string
    facebook: string
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};
// async () => {
  //const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  //const data = await response.json();
  //console.log(data)
  //return {
    // username: "Batman",
    // email: data.email,
    // channel: "data.channel",
    // social: {
      //   twitter: "data.twitter",
      //   facebook: "data.facebook"
      //}
      // };
  export const YouTubeForm = () => {
    const form = useForm<FormValues>({
      defaultValues: {
      username: "Batman",
      email:"",
      channel: "",
      social: {
          twitter: "",
          facebook: ""
        },
      phoneNumbers: ["","",],
      phNumbers: [{number: ''}],
      age: 0,
      dob: new Date()
    },
   });
   const {register, control, handleSubmit, formState} = form;

   const {errors} = formState;
   const {fields, append, remove} = useFieldArray({
    name: 'phNumbers',
    control
   })
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
              value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
                  !fieldValue.endsWith("baddomain.com") || "This domain is not supported"  
              );         
            },
          },
          required: {
            value: true,
            message: "Email is required"
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
          <div className='form-control'>
            <label htmlFor="twitter">Twitter</label>
            <input type="text" id="twitter" {...register("social.twitter",{
            required: {
              value: true,
              message: "Twitter name is required"
            },
          })}/>
            <p className='error'>{errors.social?.twitter?.message}</p>
          </div>
          <div className='form-control'>
            <label htmlFor="facebook">Facebook</label>
            <input type="text" id="facebook" {...register("social.facebook",{
              required: {
                value: true,
                message: "Facebook profile name is required"
              },
            })}/>
            <p className='error'>{errors.social?.facebook?.message}</p>
          </div>
          <div className='form-control'>
            <label htmlFor="primary-phone">Primary phone number</label>
            <input type="text" id="primary-phone" {...register("phoneNumbers.0",{
              required: {
                value: true,
                message: "Primary-phone number is required"
              },
            })}/>
            <p className='error'>{errors.phoneNumbers?.[0]?.message}</p>
          </div>
          <div className='form-control'>
            <label htmlFor="secondary-phone">Secondary phone number</label>
            <input type="text" id="secondary-phone" {...register("phoneNumbers.1",{
              required: {
                value: true,
                message: "Secondary-phone number is required"
              },
            })}/>
            <p className='error'>{errors.phoneNumbers?.[1]?.message}</p>
          </div>
          <div>
            <label>List of phone numbers</label>
            <div>
              {
                fields.map((field, index) => {
                 return (
                 <div className="form-control" key={field.id}>
                 <input type="text" {...register(`phNumbers.${index}.number` as const)} />
                 {
                  index > 0 && (
                    <button type="button" onClick={() => remove(index)}>Remove
                    </button>
                  )
                 }
                </div>) 
                })
              }
              <button type="button" onClick={() => append({
                number: ''
              })}>Add phone number
              </button>
            </div>
          </div>
          <div className='form-control'>
            <label htmlFor="channel">Age</label>
            <input type="number" id="age" {...register("age",{
            valueAsNumber: true,
            required: "Age is required",
            })}/>
            <p className='error'>{errors.age?.message}</p>
          </div>
          <div className='form-control'>
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" {...register("dob",{
            valueAsDate: true,
            required: "Date of Bitrth is required",
            })}/>
            <p className='error'>{errors.dob?.message}</p>
          </div>
          <button>Submit</button>
        </form>
        <DevTool control={control}/>
      </div>
    )
  }
  