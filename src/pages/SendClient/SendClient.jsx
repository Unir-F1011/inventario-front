import { Label, TextInput } from "flowbite-react";


function SendClient() {



    return (
          <section className="bg-black w-100 p-2 rounded-xl">
                    <h1 className="text-white">Send to client</h1>
                    <div className="flex max-w-lg flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="small">Small input</Label>
                            </div>
                            <TextInput id="small" type="text" sizing="sm" />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="base">Base input</Label>
                            </div>
                            <TextInput id="base" type="text" sizing="md" />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="large">Large input</Label>
                            </div>
                            <TextInput id="large" type="text" sizing="lg" />
                        </div>
                    </div>
                </section>
    )
}


export default SendClient