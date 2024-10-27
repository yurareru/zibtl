<script setup lang="ts">
useHead({
  title: 'Zip TL',
})
const kamus: { [key: string]: string } = {
  'A': '⏃⟒',
  'B': '⏚⎅',
  'C': '⟒⎎',
  'D': '⊑⟊',
  'E': '⟟⌰',
  'F': '⋔⏁',
  'G': '⍜⌿',
  'H': '⍾⏃',
  'I': '⎐⎍',
  'J': '⏁⍙',
  'K': '⍙⌖',
  'L': '⊬⟊',
  'M': '⋉⏚',
  'N': '⎅⟒',
  'O': '⍀⟒',
  'P': '⏚⌰',
  'Q': '⟒⍙',
  'R': '⍀⍙',
  'S': '⏚⏃',
  'T': '⟒⎍',
  'U': '⍜⍾',
  'V': '⌿⏚',
  'W': '⊑⟟',
  'X': '⋏⍙',
  'Y': '⏃⊬',
  'Z': '⍙⏚'
}
const { textarea: encodeEl, input: encodeField} = useTextareaAutosize()
const { textarea: decodeEl, input: decodeField} = useTextareaAutosize()
const encode = () => {
  encodeField.value = encodeField.value.toUpperCase()
  decodeField.value = encodeField.value.split('').map((k) => kamus[k] || k).join('')
}
const decode = () => {
  let index = 0
  encodeField.value = ''
  while (index < decodeField.value.length) {
    const value = decodeField.value.substr(index, 2)
    const decodedChar = Object.keys(kamus).find((k) => kamus[k] === value)
    if (decodedChar) {
      encodeField.value += decodedChar
      index += 2
    } else {
      encodeField.value += decodeField.value[index]
      index += 1
    }
  }
}

//@ts-expect-error this unused variable shit is handled by eslint
const { _text, copy, copied, isSupported } = useClipboard({ decodeField })
</script>
<template>
  <div class="py-16 bg-[#313338] min-h-screen flex flex-col justify-center items-center gap-4">
    <textarea
        ref="encodeEl"
        v-model="encodeField"
        class="bg-[#1e1f22] text-white w-96 h-14 p-4 rounded-2xl outline-none resize-none"
        type="text"
        placeholder="Encode"
        @input="encode"
        />
      <div class="relative">
        <textarea
            ref="decodeEl"
            v-model="decodeField"
            class="bg-[#1e1f22] text-white w-96 h-14 p-4 rounded-2xl outline-none resize-none pr-12"
            type="text"
            placeholder="Decode"
            @input="decode"
            />
          <Icon
              v-if="isSupported"
              name="material-symbols:content-copy-outline"
              class="duration-300 text-2xl absolute right-4 top-4"
              :class="copied ? 'text-green-500' : 'cursor-pointer text-[#80848e]'"
              @click="copy(decodeField)"
              />
      </div>
  </div>
</template>
