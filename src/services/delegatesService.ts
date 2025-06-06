import axios from 'axios'
import { Delegate, DelegateNote, Activitysaif } from '@/types/delegate'

const BASE_URL = 'http://test82mac.bie-paris.local/index.php'
const DEFAULT_PARAMS = {
  option: 'com_bie_membersf',
  format: 'json',
}

interface JoomlaJsonResponse<T> {
  success: boolean
  message?: string
  data?: T
}

function buildParams(task: string, extra: Record<string, string | number>) {
  return {
    ...DEFAULT_PARAMS,
    task,
    ...extra,
  }
}

export const DelegatesService = {
  async getDelegateById(id: number): Promise<any> {
    const params = buildParams('contact.getContact', { id })

    const { data } = await axios.get<JoomlaJsonResponse<Delegate>>(BASE_URL, {
      params,
      withCredentials: true,
    })

    if (data.success && data.data) {
      console.log('[getDelegateById] ✅', data.data)
      return data.data
    }
    throw new Error(data.message || 'Failed to fetch delegate')
  },

  async getNotesByDelegateId(delegateId: number): Promise<DelegateNote[]> {
    const params = buildParams('contact.getNotesByContactId', {
      contact_id: delegateId,
    })

    const { data } = await axios.get<JoomlaJsonResponse<{ notes: DelegateNote[] }>>(BASE_URL, {
      params,
      withCredentials: true,
    })

    if (data.success && data.data?.notes) {
      console.log('[getNotesByDelegateId] ✅', data.data.notes)
      return data.data.notes
    }
    throw new Error(data.message || 'No notes found')
  },

  async getMembershipsByDelegateId(delegateId: number): Promise<any[]> {
    const params = buildParams('contact.getMembershipByContactId', {
      contact_id: delegateId,
    })

    const { data } = await axios.get<JoomlaJsonResponse<{ memberships: any[] }>>(BASE_URL, {
      params,
      withCredentials: true,
    })

    if (data.success && data.data?.memberships) {
      console.log('[getMembershipsByDelegateId] ✅', data.data.memberships)
      return data.data.memberships
    }
    throw new Error(data.message || 'No memberships found')
  },

  async getActivitiesByDelegateId(delegateId: number): Promise<Activitysaif[]> {
    const params = buildParams('contact.getActivitysByContactId', {
      contact_id: delegateId,
    })

    const { data } = await axios.get<JoomlaJsonResponse<{ activities: Activitysaif[] }>>(BASE_URL, {
      params,
      withCredentials: true,
    })

    if (data.success && data.data?.activities) {
      console.log('[getActivitiesByDelegateId] ✅', data.data.activities)
      return data.data.activities
    }
    throw new Error(data.message || 'No activities found')
  },

  async generateIdentityCardUrl(delegateId: number): Promise<string> {
    const params = buildParams('contact.getIdentityCardUrl', {
      cid: delegateId,
    })

    const { data } = await axios.get<JoomlaJsonResponse<{ url: string }>>(BASE_URL, {
      params,
      withCredentials: true,
    })

    if (data.success && data.data?.url) {
      console.log('[generateIdentityCardUrl] ✅', data.data.url)
      return data.data.url
    }
    throw new Error(data.message || 'Failed to get identity card URL')
  },

async getAllDelegates(): Promise<Delegate[]> {
  console.log(' Starting ')

  const params = buildParams('delegates.getList', {
    limit: 0,
  })


  try {
    const { data } = await axios.get<JoomlaJsonResponse<Delegate[]>>(BASE_URL, {
      params,
      withCredentials: true,
    })

    console.log('  data:', data)

    if (data.success && Array.isArray(data.data)) {
      console.log('Delegates fetched in service', data.data)
      return data.data
    }

    throw new Error(data.message || 'Failed to fetch delegates')
  } catch (error: any) {
    console.error('[getAllDelegates] Error during fetch:', error)
    throw new Error(error.message || 'Unexpected error in getAllDelegates')
  }
}


}
