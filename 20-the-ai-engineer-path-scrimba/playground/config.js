import OpenAI from 'openai'
import { config as loadEnvs } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

loadEnvs()

/** OpenAI config */
if (!process.env.OPENAI_API_KEY)
  throw new Error('OpenAI API key is missing or invalid.')
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

/** Supabase config */
const privateKey = process.env.SUPABASE_API_KEY
if (!privateKey) throw new Error(`Expected env var SUPABASE_API_KEY`)
const url = process.env.SUPABASE_URL
if (!url) throw new Error(`Expected env var SUPABASE_URL`)
export const supabase = createClient(url, privateKey)
