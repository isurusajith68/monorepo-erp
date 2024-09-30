'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useEffect, useState } from 'react'

import { getPurchase } from './purchase-action'

export const detailRowSchema = z.object({
  id: z.coerce.number().optional(),
  item: z.string().optional(),
  quantity: z.coerce.number().optional(),
  price: z.coerce.number().optional(),
  utilities: z.string().optional(),
  description: z.string().optional(),
  tax: z.coerce.number().optional(),
  amount: z.coerce.number().optional(),
})

const FormSchema = z.object({
  purchaseno: z.string().min(2, {
    message: 'purchaseno must be at least 2 characters.',
  }),
  sellername: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  sellertype: z.string().min(2, {
    message: 'Seller type must be selected.',
  }),
  purchasedate: z.string({
    required_error: 'A date of birth is required.',
  }),
  duedate: z.string({
    required_error: 'A date of birth is required.',
  }),
  purchasetype: z.string().min(2, {
    message: 'purchasetype must be at least 2 characters.',
  }),
  currency: z.string().min(2, {
    message: 'currency must be at least 2 characters.',
  }),
  project: z.string().min(2, {
    message: 'project must be at least 2 characters.',
  }),
  purchasedetails: z.array(detailRowSchema),
})

//////////////component////////////////////

export default function PurchaseView({ id }: { id?: string }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      purchasedetails: [
        {
          item: '',
          quantity: 0,
          price: 0,
          utilities: '',
          description: '',
          tax: 0,
          amount: 0,
        },
      ],
    },
  })

  ////////////////use efect////////////////////////

  useEffect(() => {
    if (id) {
      const checkPurchase = async () => {
        const purchase = await getPurchase(Number(id ?? -1))
        form.reset(purchase.data)
      }
      checkPurchase()
    }
  }, [id])

  const { fields, append, remove } = useFieldArray({
    name: 'purchasedetails',
    control: form.control,
  })

  return (
    <div className="flex">
      <div className="grow pt-4">
        <p className="text-xl font-bold pb-6 pt-3 pl-6 ">New Purchase</p>
        <div className="flex justify-center rounded border-2 mb-10 border-green-200 bg-green-50/45 mx-6 py-4 ">
          <div className="">
            <Form {...form}>
              <form className="w-[100%] space-y-10 ">
                <div className="flex gap-10 space-x-16 ">
                  <div className="w-[400px] space-y-6 ">
                    <div className="">
                      <FormField
                        control={form.control}
                        name="purchaseno"
                        render={({ field }) => (
                          <FormItem className="flex ">
                            <FormLabel className="pt-4 w-[120px]">
                              purchase No
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="rounded border-2 border-green-600"
                                placeholder=""
                                {...field}
                                disabled
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={form.control}
                        name="sellertype"
                        render={({ field }) => (
                          <FormItem className="flex">
                            <FormLabel className="pt-4 w-[120px]">
                              Seller Type
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="rounded border-2 border-green-600"
                                placeholder=""
                                {...field}
                                disabled
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={form.control}
                        name="currency"
                        render={({ field }) => (
                          <FormItem className="flex">
                            <FormLabel className="pt-4 w-[120px]">
                              Currency
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="rounded border-2 border-green-600"
                                placeholder=""
                                {...field}
                                disabled
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={form.control}
                        name="duedate"
                        render={({ field }) => (
                          <FormItem className="flex">
                            <FormLabel className="pt-4 w-[120px]">
                              Due Date
                            </FormLabel>

                            <Input
                              type="date"
                              className="rounded border-2 border-green-600"
                              placeholder=""
                              {...field}
                              disabled
                            />

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="ml-6 w-[400px]  ">
                    <div className="space-y-6">
                      <div className="">
                        <FormField
                          control={form.control}
                          name="sellername"
                          render={({ field }) => (
                            <FormItem className="flex ">
                              <FormLabel className="pt-4 w-[120px]">
                                Seller Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="rounded border-2 border-green-600"
                                  placeholder=""
                                  {...field}
                                  disabled
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="">
                        <FormField
                          control={form.control}
                          name="purchasetype"
                          render={({ field }) => (
                            <FormItem className="flex">
                              <FormLabel className="pt-4 w-[120px]">
                                Purchase Type
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="rounded border-2 border-green-600"
                                  placeholder=""
                                  {...field}
                                  disabled
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div>
                        <FormField
                          control={form.control}
                          name="purchasedate"
                          render={({ field }) => (
                            <FormItem className="flex ">
                              <FormLabel className="pt-4 w-[120px]">
                                purchase Date
                              </FormLabel>
                              <Input
                                type="date"
                                className="rounded border-2 border-green-600"
                                placeholder=""
                                {...field}
                                disabled
                              />

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div>
                        <FormField
                          control={form.control}
                          name="project"
                          render={({ field }) => (
                            <FormItem className="flex">
                              <FormLabel className="pt-4 w-[120px]">
                                Project
                              </FormLabel>
                              <FormControl>
                                <FormControl>
                                  <Input
                                    className="rounded border-2 border-green-600"
                                    placeholder=""
                                    {...field}
                                    disabled
                                  />
                                </FormControl>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ///////////////////table/////////////////////////// */}

                <div className="mt-8 w-[1000px]">
                  <p className="text-xl font-bold pb-6 pt-6 ">Item Table</p>
                  <div className="border-2 rounded-lg border-green-500 p-4 bg-green-100">
                    <Table>
                      <TableHeader className="rounded-lg border-green-600 ">
                        <TableRow>
                          <TableHead>ITEM</TableHead>
                          <TableHead>UTILITIES</TableHead>
                          <TableHead>DESCRIPTION</TableHead>
                          <TableHead>QUANTITY</TableHead>
                          <TableHead>PRICE</TableHead>
                          <TableHead>TAX</TableHead>
                          <TableHead>AMOUNT</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {fields.map((field, index) => (
                          <TableRow key={field.id}>
                            <TableCell className="text-right">
                              <FormField
                                control={form.control}
                                name={`purchasedetails.${index}.item`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        className="rounded border-2 border-green-600"
                                        placeholder="item 1"
                                        {...field}
                                        disabled
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>

                            <TableCell>
                              <FormField
                                control={form.control}
                                name={`purchasedetails.${index}.utilities`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        className="rounded border-2 border-green-600"
                                        placeholder="utilities"
                                        {...field}
                                        disabled
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>

                            <TableCell>
                              <FormField
                                control={form.control}
                                name={`purchasedetails.${index}.description`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        className="rounded border-2 border-green-600"
                                        placeholder="description"
                                        {...field}
                                        disabled
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>

                            <TableCell className="text-right">
                              <FormField
                                control={form.control}
                                name={`purchasedetails.${index}.quantity`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        className="rounded border-2 border-green-600"
                                        placeholder="quantity"
                                        {...field}
                                        disabled
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>

                            <TableCell className="text-right">
                              <FormField
                                control={form.control}
                                name={`purchasedetails.${index}.price`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        className="rounded border-2 border-green-600"
                                        placeholder="price"
                                        {...field}
                                        disabled
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>

                            <TableCell className="text-right">
                              <FormField
                                control={form.control}
                                name={`purchasedetails.${index}.tax`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        className="rounded border-2 border-green-600"
                                        placeholder="tax"
                                        {...field}
                                        disabled
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>

                            <TableCell className="text-right">
                              <FormField
                                control={form.control}
                                name={`purchasedetails.${index}.amount`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        className="rounded border-2 border-green-600"
                                        placeholder="account number"
                                        {...field}
                                        disabled
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
