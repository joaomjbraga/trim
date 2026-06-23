# Ativando TRIM

Este repositório contém instruções para ativar e verificar o TRIM em sistemas Linux. O TRIM é uma funcionalidade importante para manter a performance e a longevidade de SSDs.

A documentação completa está disponível em **[docs/index.html](docs/index.html)**.

## Instruções de Ativação

Para ativar o TRIM, siga os passos abaixo:

1. **Ativação do Timer do fstrim:**

   ```sh
   sudo systemctl enable fstrim.timer --now
   ```

2. **Verificação do Status do Timer:**

   ```sh
   systemctl status fstrim.timer
   ```

3. **Forçar a Execução Manual do TRIM:**
   ```sh
   sudo fstrim /
   ```

## Configuração de Preset Personalizado

Para criar ou editar um arquivo de preset personalizado, siga os passos abaixo:

1. **Criar Diretório para Presets:**

   ```sh
   sudo mkdir /etc/systemd/system-preset/
   ```

2. **Criar ou Editar o Arquivo de Preset:**

   ```sh
   sudo nano /etc/systemd/system-preset/90-custom.preset
   ```

3. **Adicionar a Linha de Ativação:**
   ```plaintext
   enable fstrim.timer
   ```

## Aplicando as Mudanças

Para aplicar as mudanças, execute o comando abaixo:

```sh
sudo systemctl preset-all
```

## Verificação Final

Para verificar se o timer do fstrim está ativo, utilize o comando:

```sh
systemctl status fstrim.timer
```

---

Esperamos que este guia tenha sido útil. Para mais informações, consulte a [documentação oficial do systemd](https://www.freedesktop.org/software/systemd/man/).
