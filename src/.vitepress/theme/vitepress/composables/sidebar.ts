import { ref, computed } from 'vue'
import { useRoute, useData, useRouter  } from 'vitepress'
import { getSidebar } from '../support/sidebar'
import { useConfig } from './config'

export function useSidebar() {
  const route = useRoute()
  const router = useRouter()
  const { config } = useConfig()
  const { frontmatter } = useData()

  const isOpen = ref(false)

  const sidebar = computed(() => {
    const sidebarConfig = config.value.sidebar
    const relativePath = router.route.path
    console.log(router.route.path)
    console.log(relativePath)
    return sidebarConfig ? getSidebar(sidebarConfig, relativePath) : []
  })

  const hasSidebar = computed(
    () => frontmatter.value.sidebar !== false && sidebar.value.length > 0
  )

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  function toggle() {
    isOpen.value ? close() : open()
  }

  return {
    isOpen,
    sidebar,
    hasSidebar,
    open,
    close,
    toggle
  }
}
