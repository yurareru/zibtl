<script setup lang="ts">
useHead({
  title: 'Zip TL',
})
const kamus: { [key: string]: string } = {
  a: '⏃⟒',
  b: '⏚⎅',
  c: '⟒⎎',
  d: '⊑⟊',
  e: '⟟⌰',
  f: '⋔⏁',
  g: '⍜⌿',
  h: '⍾⏃',
  i: '⎐⎍',
  j: '⏁⍙',
  k: '⍙⌖',
  l: '⊬⟊',
  m: '⋉⏚',
  n: '⎅⟒',
  o: '⍀⟒',
  p: '⏚⌰',
  q: '⟒⍙',
  r: '⍀⍙',
  s: '⏚⏃',
  t: '⟒⎍',
  u: '⍜⍾',
  v: '⌿⏚',
  w: '⊑⟟',
  x: '⋏⍙',
  y: '⏃⊬',
  z: '⍙⏚',
}
const { textarea: encodeEl, input: encodeField } = useTextareaAutosize()
const { textarea: decodeEl, input: decodeField } = useTextareaAutosize()
const encode = () => {
  decodeField.value = encodeField.value
    .split('')
    .map((k) => {
      if (/[a-z]/.test(k)) {
        return kamus[k]
      }
      else if (/[A-Z]/.test(k)) {
        return `⌇${kamus[k.toLowerCase()]}`
      }
      else {
        return k
      }
    })
    .join('')
}
const decode = () => {
  let index = 0
  encodeField.value = ''
  while (index < decodeField.value.length) {
    const decodedChar = Object.keys(kamus).find(k => kamus[k] === decodeField.value.substr(index, 2))
    if (decodedChar) {
      encodeField.value += decodedChar
      index += 2
      continue
    }

    if (decodeField.value[index] === '⌇') {
      const decodedChar = Object.keys(kamus).find(k => kamus[k] === decodeField.value.substr(index + 1, 2))
      if (decodedChar) {
        encodeField.value += decodedChar.toUpperCase()
        index += 3
        continue
      }
    }
    encodeField.value += decodeField.value[index]
    index++
  }
}

// @ts-expect-error this unused variable shit is handled by eslint
const { _text, copy, copied, _isSupported } = useClipboard({ decodeField })
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
        name="material-symbols:content-copy-outline"
        class="duration-300 text-2xl absolute right-4 top-4"
        :class="copied ? 'text-green-500' : 'cursor-pointer text-[#80848e]'"
        @click="copy(decodeField)"
      />
    </div>
    <NuxtLink to="https://github.com/yurareru/ziptl" target="_blank" class="absolute bottom-4">
      <Icon
        name="mdi:github"
        class="text-white cursor-pointer text-3xl"
      />
    </NuxtLink>
  </div>
</template>
