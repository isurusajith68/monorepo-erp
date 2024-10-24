"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.description = void 0;
exports.default = LoginForm;
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const react_form_1 = require("@tanstack/react-form");
exports.description = "A simple login form with email and password. The submit button says 'Sign in'.";
function LoginForm() {
    const form = (0, react_form_1.useForm)({
        defaultValues: {
            username: '',
            password: '',
        },
        onSubmit: ({ value }) => {
            console.log(value);
        },
    });
    return (<card_1.Card className="w-full max-w-sm">
      <card_1.CardHeader>
        <card_1.CardTitle className="text-2xl">Login</card_1.CardTitle>
        <card_1.CardDescription>
          Enter your username below to login to your account.
        </card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent className="grid gap-4">
        <form onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
        }}>
          <form.Field name="username" children={(field) => (<div className="grid gap-2">
                <label_1.Label htmlFor="username">Username</label_1.Label>
                <input_1.Input id="username" type="username" placeholder="pasindu" required value={field.state.value} onChange={(e) => field.handleChange(e.target.value)}/>
              </div>)}/>
          <form.Field name="password" children={(field) => (<div className="grid gap-2">
                <label_1.Label htmlFor="password">Password</label_1.Label>
                <input_1.Input id="password" type="password" required value={field.state.value} onChange={(e) => field.handleChange(e.target.value)}/>
              </div>)}/>
          {/* <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div> */}
        </form>
      </card_1.CardContent>
      <card_1.CardFooter className="justify-between">
        <button_1.Button onClick={form.reset} className="w-1/3">
          Reset
        </button_1.Button>
        <button_1.Button onClick={form.handleSubmit} className="w-1/3">
          Sign in
        </button_1.Button>
      </card_1.CardFooter>
    </card_1.Card>);
}
