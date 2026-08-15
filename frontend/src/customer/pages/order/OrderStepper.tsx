import React, { useEffect, useState } from 'react'
import { CheckCircle, FiberManualRecord } from '@mui/icons-material'
import { Box } from '@mui/material'

interface OrderStepperProps {
  orderStatus: string
  createdAt?: string | Date 
}

const formatOffsetDate = (baseDate: Date, addDays: number, includeDayName = true) => {
  const targetDate = new Date(baseDate)
  targetDate.setDate(targetDate.getDate() + addDays)

  const dayName = targetDate.toLocaleDateString('en-US', { weekday: 'short' })
  const monthName = targetDate.toLocaleDateString('en-US', { month: 'short' })
  const dayNum = targetDate.getDate()

  return includeDayName
    ? `${dayName}, ${dayNum} ${monthName}`
    : `${dayNum} ${monthName}`
}

function OrderStepper({ orderStatus, createdAt = new Date() }: OrderStepperProps) {
  const orderDate = new Date(createdAt)

  
  const normalSteps = [
    {
      name: 'Order Placed',
      description: `on ${formatOffsetDate(orderDate, 0, true)}`, // Day 0
      value: 'PLACED',
    },
    {
      name: 'Packed',
      description: 'Item Packed in Dispatch Warehouse',
      value: 'CONFIRMED',
    },
    {
      name: 'Shipped',
      description: `by ${formatOffsetDate(orderDate, 2, true)}`,
      value: 'SHIPPED',
    },
    {
      name: 'Arriving',
      description: `by ${formatOffsetDate(orderDate, 4, false)} - ${formatOffsetDate(orderDate, 6, false)}`, 
      value: 'ARRIVING',
    },
    {
      name: 'Arrived',
      description: `by ${formatOffsetDate(orderDate, 7, true)}`,
      value: 'DELIVERED',
    },
  ]

  const canceledSteps = [
    {
      name: 'Order Placed',
      description: `on ${formatOffsetDate(orderDate, 0, true)}`,
      value: 'PLACED',
    },
    {
      name: 'Order Canceled',
      description: `on ${formatOffsetDate(orderDate, 0, true)}`,
      value: 'CANCELLED',
    },
  ]

  const [statusStep, setStatusStep] = useState(normalSteps)

  useEffect(() => {
    if (orderStatus === 'CANCELLED') {
      setStatusStep(canceledSteps)
    } else {
      setStatusStep(normalSteps)
    }
  }, [orderStatus, createdAt])

  const currentStepIndex = statusStep.findIndex(
    (step) => step.value === orderStatus
  )

  return (
    <Box className="mx-auto my-10 max-w-md">
      {statusStep.map((step, index) => {
        const isCompleted = index <= (currentStepIndex !== -1 ? currentStepIndex : 0)
        const isCurrent = step.value === orderStatus

        return (
          <React.Fragment key={step.value}>
            <div className="flex px-4">
              
              <div className="flex flex-col items-center">
                <Box
                  className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                    isCompleted
                      ? 'bg-teal-100 text-teal-600'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isCurrent ? <CheckCircle /> : <FiberManualRecord />}
                </Box>
                {index < statusStep.length - 1 && (
                  <div
                    className={`border h-16 w-[2px] ${
                      isCompleted ? 'bg-teal-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>

            
              <div className="ml-4 w-full pb-4">
                <div
                  className={`w-full ${
                    isCurrent
                      ? `${
                          orderStatus === 'CANCELLED'
                            ? 'bg-red-500'
                            : 'bg-teal-600'
                        } p-3 text-white font-medium rounded-md -translate-y-2`
                      : ''
                  }`}
                >
                  <p className="font-semibold">{step.name}</p>
                  <p
                    className={`text-xs ${
                      isCurrent ? 'text-gray-100' : 'text-gray-500'
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          </React.Fragment>
        )
      })}
    </Box>
  )
}

export default OrderStepper