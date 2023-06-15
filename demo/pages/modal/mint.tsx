import { NextPage } from 'next'
import { MintModal } from '@reservoir0x/reservoir-kit-ui'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import ThemeSwitcher from 'components/ThemeSwitcher'
import { useState } from 'react'
import DeeplinkCheckbox from 'components/DeeplinkCheckbox'
import { useRouter } from 'next/router'

const DEFAULT_COLLECTION_ID =
  process.env.NEXT_PUBLIC_DEFAULT_COLLECTION_ID ||
  '0xe14fa5fba1b55946f2fa78ea3bd20b952fa5f34e'

const MintPage: NextPage = () => {
  const router = useRouter()
  const [collectionId, setCollectionId] = useState(DEFAULT_COLLECTION_ID)
  const [feesOnTopBps, setFeesOnTopBps] = useState<string[]>([])
  const [feesOnTop, setFeesOnTop] = useState<string[]>([])
  const deeplinkOpenState = useState(true)
  const hasDeeplink = router.query.deeplink !== undefined

  return (
    <div
      style={{
        display: 'flex',
        height: 50,
        width: '100%',
        gap: 12,
        padding: 24,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 150,
      }}
    >
      <ConnectButton />

      <div>
        <label>Collection Id: </label>
        <input
          type="text"
          value={collectionId}
          onChange={(e) => setCollectionId(e.target.value)}
        />
      </div>

      <div>
        <label>Fees on top (BPS): </label>
        <textarea
          onChange={() => {}}
          onBlur={(e) => {
            if (e.target.value && e.target.value.length > 0) {
              try {
                setFeesOnTopBps(JSON.parse(e.target.value))
              } catch (err) {
                e.target.value = ''
                setFeesOnTopBps([])
              }
            } else {
              e.target.value = ''
              setFeesOnTopBps([])
            }
          }}
        />
      </div>
      <div>
        <label>Fees on top (Flat): </label>
        <textarea
          onChange={() => {}}
          onBlur={(e) => {
            if (e.target.value && e.target.value.length > 0) {
              try {
                setFeesOnTop(JSON.parse(e.target.value))
              } catch (err) {
                e.target.value = ''
                setFeesOnTop([])
              }
            } else {
              e.target.value = ''
              setFeesOnTop([])
            }
          }}
        />
      </div>
      <DeeplinkCheckbox />

      <MintModal
        trigger={
          <button
            style={{
              marginTop: 50,
              padding: 24,
              background: 'blue',
              color: 'white',
              fontSize: 18,
              border: '1px solid #ffffff',
              borderRadius: 8,
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            Mint
          </button>
        }
        collectionId={collectionId}
        feesOnTopBps={feesOnTopBps}
        feesOnTopFixed={feesOnTop}
        openState={hasDeeplink ? deeplinkOpenState : undefined}
        onMintComplete={(data) => {
          console.log('Mint Complete', data)
        }}
        onMintError={(error, data) => {
          console.log('Mint Error', error, data)
        }}
        onClose={(data, currentStep) => {
          console.log('MintModal Closed')
        }}
      />
      <ThemeSwitcher />
    </div>
  )
}

export default MintPage
