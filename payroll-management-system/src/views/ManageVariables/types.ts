import type { Control, FieldErrors } from 'react-hook-form'

export type Customer = {
    id: string | number
    name: string
    firstName: string
    lastName: string
    email: string
    img?: string
    role?: string
    lastOnline?: number
    status?: string
    totalSpending: number
}
export type LeaveType = {
    _id: number
    name: string
}

export type TableQueries = {
    total?: number
    pageIndex?: number
    pageSize?: number
    query?: string
    sort?: {
        order: 'asc' | 'desc' | ''
        key: string | number
    }
}

export type OverviewFields = {
    firstName: string
    lastName: string
    email: string
    dialCode: string
    phoneNumber: string
    img: string
}

export type AddressFields = {
    country: string
    address: string
    postcode: string
    city: string
}

export type ProfileImageFields = {
    img: string
}

export type TagsFields = {
    tags: Array<{ value: string; label: string }>
}

export type AccountField = {
    banAccount?: boolean
    accountVerified?: boolean
}

export type CustomerFormSchema = OverviewFields &
    AddressFields &
    ProfileImageFields &
    TagsFields &
    AccountField

export type FormSectionBaseProps = {
    control: Control<CustomerFormSchema>
    errors: FieldErrors<CustomerFormSchema>
}

export type View = 'leaveType' | 'businessNatureType'

export type CreditCard = {
    cardHolderName: string
    cardType: string
    expMonth: string
    expYear: string
    last4Number: string
    primary: boolean
}

export type CreditCardInfo = { cardId: string } & CreditCard

export type Integration = {
    id: string
    name: string
    desc: string
    img: string
    type: string
    active: boolean
    installed?: boolean
}

export type GetSettingsProfileResponse = {
    id: string
    name: string
    firstName: string
    lastName: string
    email: string
    img: string
    location: string
    address: string
    postcode: string
    city: string
    country: string
    dialCode: string
    birthday: string
    phoneNumber: string
}

export type GetSettingsNotificationResponse = {
    email: string[]
    desktop: boolean
    unreadMessageBadge: boolean
    notifymeAbout: string
}

export type GetSettingsBillingResponse = {
    paymentMethods: Array<CreditCardInfo>
    transactionHistory: Array<{
        id: string
        item: string
        status: string
        amount: number
        date: number
    }>
    currentPlan: {
        plan: string
        status: string
        billingCycle: string
        nextPaymentDate: number
        amount: number
    }
}

export type GetSettingsIntegrationResponse = Integration[]
